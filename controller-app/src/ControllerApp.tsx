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
    <div className="text-green-700">
      <div>Controller App</div>
      <Button
        onClick={() => {
          mutation.mutate({ layers: ["Test!"] });
        }}
      >
        Layers
      </Button>
      <Button
        onClick={() => {
          mutationZoomIn.mutate();
        }}
      >
        Zoom In
      </Button>
      <Button
        onClick={() => {
          mutationZoomOut.mutate();
        }}
      >
        Zoom Out
      </Button>
    </div>
  );
}
