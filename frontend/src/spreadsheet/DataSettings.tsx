import { EditDataSettings } from "./EditDataSettings";


export function DataSettings() {
  return (
    <>
      <div className="my-4">{/* <ShareRoom /> */}</div>
      <div className="my-4">{/* <ManualJoinRoom /> */}</div>
      <div className="my-4">{/* <CreateRoom /> */}</div>
      <div>
        <EditDataSettings />
      </div>
    </>
  );
}
