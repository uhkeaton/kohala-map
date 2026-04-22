import debounce from "lodash.debounce";
import { useGlobal } from "./useGlobal";
import { useRoomCode } from "./room/room";
import { useEffect, useMemo } from "react";
import { useWebSocketConnection } from "./room/socket";
import { useLocation, useNavigate } from "react-router";
import { VisitorFeatureSelect } from "./VisitorFeatureSelect";

export function IPadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { features, setVisibleFeatureId } = useGlobal();
  const { roomCode, joinRoomMutation } = useRoomCode();
  const { send } = useWebSocketConnection(roomCode);
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

  const handleChange = useMemo(
    () =>
      debounce((id: string) => {
        if (!id) return;

        const feature = features.find((item) => item.id === id);
        if (!feature) return;

        setVisibleFeatureId(id);

        send?.({
          action: "selectFeature",
          payload: {
            id: feature.id,
          },
        });
      }, 100),
    [features, send, setVisibleFeatureId],
  );

  return <VisitorFeatureSelect onChange={handleChange} />;
  // return (
  //   <div className="h-[100dvh] w-[100dvw] bg-white overflow-hidden p-4">
  //     <div className="max-w-sm m-auto flex flex-col justify-between w-full h-full">
  //       <div>
  //         <div className="px-4 mb-8 text-2xl">Controller</div>
  //         <VisitorFeatureSelect />
  //         <div className="px-4 mb-4">
  //           <FeatureSelectDev />
  //         </div>
  //       </div>
  //       <div>
  //         <div className="px-4 mb-4">
  //           <ConnectedStatus />
  //         </div>
  //         <div className="px-4 mb-4">
  //           <ManualJoinRoom />
  //         </div>
  //         <div>
  //           <Button
  //             className="w-full"
  //             onClick={() => {
  //               navigate("/");
  //             }}
  //             variant="text"
  //           >
  //             Map View
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
