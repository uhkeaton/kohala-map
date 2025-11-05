import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
from pydantic import BaseModel

app = FastAPI()

# CORS
origins = ["*", "http://localhost:5173/"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Room Management ---

class Room:
    def __init__(self, room_code: str):
        self.room_code = room_code
        self.connections: List[WebSocket] = []

    async def broadcast_text(self, message: str, exclude: WebSocket = None):
        for ws in self.connections:
            if ws != exclude:
                await ws.send_text(message)

    async def broadcast_json(self, data: dict, exclude: WebSocket = None):
        for ws in self.connections:
            if ws != exclude:
                await ws.send_json(data)

rooms: Dict[str, Room] = {}

# --- WebSocket Endpoint ---

@app.websocket("/socket")
async def socket_ws(ws: WebSocket):
    await ws.accept()

    # Wait for first message: should contain the room_code
    init_data = await ws.receive_text()
    try:
        payload = json.loads(init_data)
        room_code = payload.get("room_code")
        if not room_code:
            await ws.send_text("Missing room_code in initial message")
            await ws.close()
            return
    except json.JSONDecodeError:
        await ws.send_text("Invalid JSON in initial message")
        await ws.close()
        return

    # Create room if necessary
    if room_code not in rooms:
        rooms[room_code] = Room(room_code)
    room = rooms[room_code]
    room.connections.append(ws)

    print(f"Client joined room: {room_code}")

    try:
        while True:
            data = await ws.receive_text()
            print(f"[Room {room_code}] Received: {data}")
            await room.broadcast_text(data, exclude=ws)
    except WebSocketDisconnect:
        print(f"Client disconnected from {room_code}")
        room.connections.remove(ws)
        if not room.connections:
            rooms.pop(room_code)
