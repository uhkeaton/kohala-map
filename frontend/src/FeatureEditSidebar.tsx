import { Button, Divider, TextField } from "@mui/material";
import { useGlobal } from "./useGlobal";
import { ButtonClose } from "./ButtonClose";
import { defaultInitialFeature } from "./featureEditDefault";
import { ButtonCopy } from "./ButtonCopy";
import toast from "react-hot-toast";
import { FilterForm } from "./FilterForm";
import { colorFilters, fromCssFilterString, IDENTITY_FILTER } from "./filter";

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
    <div className="text-white w-full h-full overflow-y-scroll">
      <div className="flex sticky top-0 bg-[#3d3d3d] z-10 w-full justify-between">
        <div>
          <ButtonClose
            onClick={() => {
              setIsEditingRow(false);
            }}
          />
        </div>
        <div>
          <ButtonCopy
            onClick={() => {
              toast.success(
                "Copied row to clipboard! Paste the new row in Google Sheets.",
              );
            }}
          />
        </div>
      </div>
      <div className="m-4 mt-8">
        <div className="text-xl mb-4">Feature Info</div>
        <div className="mb-4">
          <TextField
            id="info-title"
            label="Title"
            variant="outlined"
            fullWidth
            value={editedFeature?.infoTitle || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, infoTitle: val }));
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
            value={editedFeature?.infoDescription || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, infoDescription: val }));
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            id="info-title-hawaiian"
            label="ʻŌlelo Title"
            variant="outlined"
            fullWidth
            value={editedFeature?.infoTitleHawaiian || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, infoTitleHawaiian: val }));
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
            value={editedFeature?.infoDescriptionHawaiian || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, infoDescriptionHawaiian: val }));
            }}
          />
        </div>
        <Divider sx={{ my: 4 }} />
        <div className="text-xl mb-4">Media</div>
        <div className="mb-4">
          <TextField
            id="info-img-src"
            label="Image Link"
            variant="outlined"
            fullWidth
            value={editedFeature?.mediaImgSrc || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, mediaImgSrc: val }));
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            id="info-video-src"
            label="Video Link"
            variant="outlined"
            fullWidth
            value={editedFeature?.mediaVideoSrc || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val = event.target.value;
              setEditedFeature((s) => ({ ...s, mediaVideoSrc: val }));
            }}
          />
        </div>
        {editedFeature?.mediaVideoSrc && (
          <div className="mb-4 opacity-70">* video will override image</div>
        )}
        {/*  */}
        <Divider sx={{ my: 4 }} />
        <div className="text-xl mb-4">Point</div>
        <FilterForm
          allow={colorFilters}
          value={
            fromCssFilterString(editedFeature?.mapMaskFilterNegative) ||
            IDENTITY_FILTER
          }
          onChange={(value) => {
            setEditedFeature((s) => {
              return { ...s, mapMaskFilterNegative: value };
            });
            console.log("");
          }}
        />
        {/* */}
        <Divider sx={{ my: 4 }} />
        <div className="text-xl mb-4">Map</div>
        {/**/}
      </div>
    </div>
  );
}
