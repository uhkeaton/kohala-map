import { Button } from "@mui/material";
import { controlMap } from "./api";

import { useMutation } from "@tanstack/react-query";

export function ControllerApp() {
  const mutation = useMutation({
    mutationFn: controlMap,
    onSuccess: () => {},
  });

  return (
    <div className="text-green-700">
      <div>Controller App</div>
      <Button
        onClick={() => {
          mutation.mutate({ layers: ["Test!"] });
        }}
      >
        Send Message
      </Button>
    </div>
  );
}
