import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useRoomCode } from "./room/room";
import { ControllerFeatureSelect } from "./features/ControllerFeatureSelect";
import { ManualJoinRoom } from "./room/ManualJoinRoom";
import { ConnectedStatus } from "./room/ConnectedStatus";
import { Button } from "@mui/material";
// import { IPad } from "./IPadList";

export function IPadPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const { joinRoomMutation } = useRoomCode();
  const { mutate } = joinRoomMutation;

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
        { replace: true },
      );
      mutate(code);
    }
  }, [mutate, location.pathname, location.search, navigate]);

  // return <IPad />;

  return (
    <div className="h-[100dvh] w-[100dvw] bg-white overflow-hidden p-4">
      <div className="max-w-sm m-auto flex flex-col justify-between w-full h-full">
        <div>
          <div className="px-4 mb-8 text-2xl">Controller</div>

          <div className="px-4 mb-4">
            <ControllerFeatureSelect />
          </div>
        </div>
        <div>
          <div className="px-4 mb-4">
            <ConnectedStatus />
          </div>
          <div className="px-4 mb-4">
            <ManualJoinRoom />
          </div>
          <div>
            <Button
              className="w-full"
              onClick={() => {
                navigate("/");
              }}
              variant="text"
            >
              Map View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
