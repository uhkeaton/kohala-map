import { Button, Divider, TextField } from "@mui/material";
import { useGlobal } from "./useGlobal";
import { ButtonClose } from "./ButtonClose";
import { defaultInitialFeature } from "./featureEditDefault";

export function ButtonCreateFeature() {
  const { setEditedFeature, setDisplaySettings, setIsEditingRow } = useGlobal();
  return (
    <div>
      <Button
        className="w-full"
        onClick={() => {
          // initialize edited feature if there is none already
          setEditedFeature((s) => (s ? s : defaultInitialFeature()));
          setDisplaySettings((s) => ({
            ...s,
            showMainDrawer: false,
          }));
          setIsEditingRow(true);
        }}
        variant="contained"
      >
        Create a Row
      </Button>
    </div>
  );
}

export function FeatureEditSidebar() {
  const { editedFeature, setIsEditingRow, setEditedFeature } = useGlobal();
  return (
    <div className="text-white">
      <ButtonClose
        onClick={() => {
          setIsEditingRow(false);
        }}
      />
      <div className="m-4 mt-8">
        <div className="text-xl mb-4">Feature Info</div>
        <div className="mb-4">
          <TextField
            id="info-title"
            label="Title"
            variant="outlined"
            fullWidth
            value={editedFeature?.title || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, title: val }));
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            id="info-description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            value={editedFeature?.description || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, description: val }));
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            id="info-title-hawaiian"
            label="ʻŌlelo Title"
            variant="outlined"
            fullWidth
            value={editedFeature?.titleHawaiian || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, titleHawaiian: val }));
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            id="info-description-hawaiian"
            label="ʻŌlelo Description"
            variant="outlined"
            fullWidth
            multiline
            value={editedFeature?.descriptionHawaiian || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, descriptionHawaiian: val }));
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            id="info-img-src"
            label="Image Src"
            variant="outlined"
            fullWidth
            value={editedFeature?.imgSrc || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, imgSrc: val }));
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            id="info-video-src"
            label="Video Src"
            variant="outlined"
            fullWidth
            value={editedFeature?.videoSrc || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, videoSrc: val }));
            }}
          />
        </div>
        {/*  */}
        <Divider sx={{ my: 4 }} />
        <div className="text-xl mb-4">Point</div>
        {/* */}
        <Divider sx={{ my: 4 }} />
        <div className="text-xl mb-4">Map</div>
        {/**/}
      </div>
    </div>
  );
}
