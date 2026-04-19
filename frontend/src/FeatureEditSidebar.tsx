import { Divider, Slider, TextField } from "@mui/material";
import { useGlobal } from "./useGlobal";
import { ButtonClose } from "./ButtonClose";
import { ButtonCopyEditedFeatureRow, ButtonCopyValue } from "./ButtonCopy";
import { FilterForm, FilterFormType } from "./FilterForm";
import { fromCssFilterString, toCssFilterString } from "./filter";
import { sliderStyles } from "./slider";
import { defaultInitialFeature } from "./feature";
import { ButtonReset } from "./ButtonReset";

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
        <Divider sx={{ my: 4 }} />
        {/*  */}
        <div className="mb-8">
          <GenericFilterSection
            title="Point"
            featureKey="pointFilter"
            filterType="hsb"
          />
        </div>
        <SectionPointCoordinatesForm />
        <Divider sx={{ my: 4 }} />
        <GenericFilterSection
          title="Background Color"
          featureKey="mapMaskFilterNegative"
          filterType="hsb"
        />
        <Divider sx={{ my: 4 }} />
        <GenericFilterSection
          title="Map Base Color"
          featureKey="mapMaskFilterPositive"
          filterType="hsb"
        />
        <Divider sx={{ my: 4 }} />
        <GenericFilterSection
          title="Terrain Filter"
          featureKey="mapTerrainFilter"
          filterType="hsbo"
        />
        <Divider sx={{ my: 4 }} />
        <SectionMapOverlays />
        <Divider sx={{ my: 4 }} />
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

function GenericFilterSection({
  title,
  featureKey,
  filterType,
}: {
  title: string;
  featureKey:
    | "pointFilter"
    | "mapMaskFilterNegative"
    | "mapMaskFilterPositive"
    | "mapVideoFilter"
    | "mapTerrainFilter"
    | "mapImgFilter";
  filterType: FilterFormType;
}) {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl mb-4">{title}</div>
        <div className="flex gap-2">
          <div>
            <ButtonReset
              disabled={
                editedFeature[featureKey] == defaultInitialFeature[featureKey]
              }
              onClick={() => {
                setEditedFeature((s) => {
                  return {
                    ...s,
                    [featureKey]: defaultInitialFeature[featureKey],
                  };
                });
              }}
            />
          </div>
          <div>
            <ButtonCopyValue
              value={toCssFilterString(editedFeature?.[featureKey]) || ""}
            />
          </div>
        </div>
      </div>
      <FilterForm
        type={filterType}
        value={fromCssFilterString(editedFeature?.[featureKey])}
        onChange={(value) => {
          console.log(value, featureKey);
          setEditedFeature((s) => {
            return { ...s, [featureKey]: value };
          });
        }}
      />
    </>
  );
}

function SectionMapOverlays() {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
      <GenericFilterSection
        title="Map Overlay Video"
        featureKey="mapVideoFilter"
        filterType="hsbo"
      />
      <div className="my-6">
        <TextField
          id="info-img-src"
          label="Overlay Video Link"
          variant="outlined"
          fullWidth
          value={editedFeature?.mapVideoSrc || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const val = event.target.value;
            setEditedFeature((s) => ({ ...s, mapVideoSrc: val }));
          }}
        />
      </div>
      <Divider sx={{ my: 4 }} />
      <GenericFilterSection
        title="Map Overlay Image"
        featureKey="mapImgFilter"
        filterType="hsbo"
      />
      <div className="my-6">
        <TextField
          id="info-img-src"
          label="Overlay Image Link"
          variant="outlined"
          fullWidth
          value={editedFeature?.mapImgSrc || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const val = event.target.value;
            setEditedFeature((s) => ({ ...s, mapImgSrc: val }));
          }}
        />
      </div>
    </>
  );
}

export function SectionPointCoordinatesForm() {
  const { editedFeature, setEditedFeature, worldConfig } = useGlobal();
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-4">
      <div className="w-36">{`Lon: ${editedFeature?.pointLon?.toFixed(2)}`}</div>
      <div className="relative w-full">
        <Slider
          sx={sliderStyles}
          value={editedFeature?.pointLon}
          min={worldConfig?.minLon}
          max={worldConfig?.maxLon}
          step={0.001}
          onChange={(_, v) => setEditedFeature((s) => ({ ...s, pointLon: v }))}
        />
      </div>
      <div className="w-36">{`Lat: ${editedFeature?.pointLat?.toFixed(2)}`}</div>
      <div className="relative w-full">
        <Slider
          sx={sliderStyles}
          value={editedFeature?.pointLat}
          min={worldConfig?.minLat}
          max={worldConfig?.maxLat}
          step={0.001}
          onChange={(_, v) => setEditedFeature((s) => ({ ...s, pointLat: v }))}
        />
      </div>
    </div>
  );
}
