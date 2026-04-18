import { Divider, TextField } from "@mui/material";
import { useGlobal } from "./useGlobal";
import { ButtonClose } from "./ButtonClose";
import { ButtonCopyEditedFeatureRow, ButtonCopyValue } from "./ButtonCopy";
import { FilterForm } from "./FilterForm";
import { fromCssFilterString, toCssFilterString } from "./filter";

export function FeatureEditSidebar() {
  const { setIsEditingRow } = useGlobal();
  return (
    <div className="text-white w-full h-full overflow-y-scroll">
      <div className="flex sticky top-0 bg-[#3d3d3d] z-10 w-full justify-between border-b border-white/20">
        <div>
          <ButtonClose
            onClick={() => {
              setIsEditingRow(false);
            }}
          />
        </div>
        <div>
          <ButtonCopyEditedFeatureRow />
        </div>
      </div>
      <div className="m-4 mt-8">
        <SectionInfoForm />
        <Divider sx={{ my: 4 }} />
        <SectionMediaForm />
        {/*  */}
        <Divider sx={{ my: 4 }} />
        <SectionBackgroundColor />
        <Divider sx={{ my: 4 }} />
        <SectionMapColor />
        <Divider sx={{ my: 4 }} />
        <div className="text-xl mb-4">Map</div>
        {/**/}
      </div>
    </div>
  );
}

function SectionInfoForm() {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
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
    </>
  );
}

function SectionMediaForm() {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
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
    </>
  );
}

function SectionBackgroundColor() {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl mb-4">Background Color</div>
        <div>
          <ButtonCopyValue
            value={
              toCssFilterString(editedFeature?.mapMaskFilterNegative) || ""
            }
          />
        </div>
      </div>
      <FilterForm
        type={"hsb"}
        value={fromCssFilterString(editedFeature?.mapMaskFilterNegative)}
        onChange={(value) => {
          setEditedFeature((s) => {
            return { ...s, mapMaskFilterNegative: value };
          });
        }}
      />
    </>
  );
}

function SectionMapColor() {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl mb-4">Map Color</div>
        <div>
          <ButtonCopyValue
            value={
              toCssFilterString(editedFeature?.mapMaskFilterPositive) || ""
            }
          />
        </div>
      </div>
      <FilterForm
        type={"hsb"}
        value={fromCssFilterString(editedFeature?.mapMaskFilterPositive)}
        onChange={(value) => {
          setEditedFeature((s) => {
            return { ...s, mapMaskFilterPositive: value };
          });
        }}
      />
    </>
  );
}
