import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full flex justify-between m-4">
        <div className="text-2xl">Kohala Map</div>
      </div>
      <div className="flex flex-col gap-4 m-8">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/map");
          }}
        >
          Map
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/controller");
          }}
        >
          Controller
        </Button>
      </div>
    </div>
  );
}
