import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useJoinRoomCode, useRoomCode } from "../room/room";
import { ControllerFeatureSelect } from "../features/ControllerFeatureSelect";

export function Controller() {
  const { roomCode } = useRoomCode();
  const navigate = useNavigate();

  const location = useLocation();

  const { mutate } = useJoinRoomCode();

  //  check url for room code
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      params.delete("code");
      const newSearch = params.toString();
      navigate(
        {
          pathname: location.pathname,
          search: newSearch ? `?${newSearch}` : "",
        },
        // replace: true prevents adding a new history entry
        { replace: true }
      );
      mutate(code);
    }
  }, [mutate, location.pathname, location.search, navigate]);

  // const mutationZoomIn = useMutation({
  //   mutationFn: zoomIn,
  // });
  // const mutationZoomOut = useMutation({
  //   mutationFn: zoomOut,
  // });

  return (
    <div className="h-[100dvh] w-[100dvw] bg-white overflow-hidden p-4">
      {/* <div className="w-full flex justify-between mb-4">
        <CloseButton
          onClick={() => {
            navigate("/");
          }}
        />
      </div> */}
      <div className="text-2xl mb-4">Controller</div>
      <div>Room: {roomCode}</div>

      {/* <Button
        onClick={() => {
          mutation.mutate({ layers: ["Test!"] });
        }}
      >
        Layers
      </Button> */}
      <ControllerFeatureSelect />
      <div className="flex flex-col gap-4">
        {/* <Button
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
        </Button> */}
      </div>
    </div>
  );
}
