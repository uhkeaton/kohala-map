import { Button } from "@mui/material";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";
import { CloseButton } from "./ui/CloseButton";

const API_URL = import.meta.env.VITE_IP ?? "http://127.0.0.1";

export function Scan() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full flex justify-end mb-4">
        <CloseButton
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="w-full flex m-8">
        <div className="m-auto">
          <div>
            <QRCode value={API_URL + ":5173"} />
          </div>
          <div className="flex flex-col gap-4 my-8">
            <Button
              variant="contained"
              onClick={() => {
                // navigate("/map");
              }}
            >
              Regenerate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
