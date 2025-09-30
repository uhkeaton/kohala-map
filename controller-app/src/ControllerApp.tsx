import { controlMap } from "./api";
import "./App.css";

import { useMutation } from "@tanstack/react-query";

export function ControllerApp() {
  const mutation = useMutation({
    mutationFn: controlMap,
    onSuccess: () => {},
  });

  return (
    <div>
      <div>Controller App</div>
      <button
        onClick={() => {
          mutation.mutate({ layers: ["Test!"] });
        }}
      >
        Send Message
      </button>
    </div>
  );
}
