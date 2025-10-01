import { Button } from "@mui/material";
import { controlMap, zoomIn, zoomOut } from "./api";

import { useMutation } from "@tanstack/react-query";

export function ControllerApp() {
  const mutation = useMutation({
    mutationFn: controlMap,
    onSuccess: () => {},
  });

  const mutationZoomIn = useMutation({
    mutationFn: zoomIn,
  });
  const mutationZoomOut = useMutation({
    mutationFn: zoomOut,
  });

  return (
    <div className="m-4">
      <div className="text-2xl mb-4">Controller App</div>
      {/* <Button
        onClick={() => {
          mutation.mutate({ layers: ["Test!"] });
        }}
      >
        Layers
      </Button> */}
      <div className="flex flex-col gap-4">
        <Button
          variant="contained"
          onClick={() => {
            mutationZoomIn.mutate();
          }}
        >
          Zoom In
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            mutationZoomOut.mutate();
          }}
        >
          Zoom Out
        </Button>
      </div>
    </div>
  );
}
