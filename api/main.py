# Command to Run the Server: fastapi dev main.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from pydantic import BaseModel

app = FastAPI()

connections: List[WebSocket] = []

# CORS
origins = [
    "*",  
    "http://localhost:5173/",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


class MapState(BaseModel):
    layers: List[str]
    
@app.post("/control")
async def control(state: MapState):
    for ws in connections:
        await ws.send_text(f"{state.layers[0]}")
    return {"status": "Success"}

@app.post("/zoom-in")
async def zoom_in():
    for ws in connections:
        await ws.send_text(f"zoom-in")
    return {"status": "Success"}

@app.post("/zoom-out")
async def zoom_out():
    for ws in connections:
        await ws.send_text(f"zoom-out")
    return {"status": "Success"}



@app.websocket("/map-ws")
async def map_ws(ws: WebSocket):
    await ws.accept()
    connections.append(ws)
    try:
        while True:
            data = await ws.receive_text()
            print("WS received:", data)
            await ws.send_text(f"Echo: {data}")
    except WebSocketDisconnect:
        connections.remove(ws)