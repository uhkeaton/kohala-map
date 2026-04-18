import { Divider, Slider, TextField } from "@mui/material";
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
        <Divider sx={{ my: 4 }} />
        {/*  */}
        <div className="mb-8">
          <SectionPointColor />
        </div>
        <SectionPointCoordinatesForm />
        <Divider sx={{ my: 4 }} />
        <SectionBackgroundColor />
        <Divider sx={{ my: 4 }} />
        <SectionMapColor />
        <Divider sx={{ my: 4 }} />
        <SectionTerrainFilter />
        <Divider sx={{ my: 4 }} />
        <SectionMapOverlayVideo />
        <Divider sx={{ my: 4 }} />
        <SectionMapOverlayImage />
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
        <div className="text-xl mb-4">Map Base Color</div>
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

function SectionTerrainFilter() {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl mb-4">Terrain Filter</div>
        <div>
          <ButtonCopyValue
            value={toCssFilterString(editedFeature?.mapTerrainFilter) || ""}
          />
        </div>
      </div>
      <FilterForm
        type={"hsbo"}
        value={fromCssFilterString(editedFeature?.mapTerrainFilter)}
        onChange={(value) => {
          setEditedFeature((s) => {
            return { ...s, mapTerrainFilter: value };
          });
        }}
      />
    </>
  );
}

function SectionMapOverlayVideo() {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl mb-4">Map Overlay Video</div>
        <div>
          <ButtonCopyValue
            value={toCssFilterString(editedFeature?.mapVideoFilter) || ""}
          />
        </div>
      </div>
      <div className="mb-4">
        <FilterForm
          type={"hsbo"}
          value={fromCssFilterString(editedFeature?.mapVideoFilter)}
          onChange={(value) => {
            setEditedFeature((s) => {
              return { ...s, mapVideoFilter: value };
            });
          }}
        />
      </div>
      <div className="mb-4">
        <TextField
          id="info-img-src"
          label="Map Image Link"
          variant="outlined"
          fullWidth
          value={editedFeature?.mapVideoSrc || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const val = event.target.value;
            setEditedFeature((s) => ({ ...s, mapVideoSrc: val }));
          }}
        />
      </div>
    </>
  );
}

function SectionMapOverlayImage() {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl mb-4">Map Overlay Image</div>
        <div>
          <ButtonCopyValue
            value={toCssFilterString(editedFeature?.mapImgFilter) || ""}
          />
        </div>
      </div>
      <div className="mb-4">
        <FilterForm
          type={"hsbo"}
          value={fromCssFilterString(editedFeature?.mapImgFilter)}
          onChange={(value) => {
            setEditedFeature((s) => {
              return { ...s, mapImgFilter: value };
            });
          }}
        />
      </div>
      <div className="mb-4">
        <TextField
          id="info-img-src"
          label="Map Image Link"
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

const sliderStyles = {
  color: "white", // affects track + thumb by default
  "& .MuiSlider-thumb": {
    backgroundColor: "white",
  },
  "& .MuiSlider-track": {
    backgroundColor: "white",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#ccc", // optional contrast
  },
};

function SectionPointColor() {
  const { editedFeature, setEditedFeature } = useGlobal();
  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl mb-4">Point</div>
        <div>
          <ButtonCopyValue
            value={toCssFilterString(editedFeature?.pointFilter) || ""}
          />
        </div>
      </div>
      <FilterForm
        type={"hsb"}
        value={fromCssFilterString(editedFeature?.pointFilter)}
        onChange={(value) => {
          setEditedFeature((s) => {
            return { ...s, pointFilter: value };
          });
        }}
      />
    </>
  );
}

export function SectionPointCoordinatesForm() {
  const { editedFeature, setEditedFeature, worldConfig } = useGlobal();
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-4">
      <div className="w-36">{`Longitude: ${editedFeature?.pointLon?.toFixed(2)}`}</div>
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
      <div className="w-36">{`Latitude: ${editedFeature?.pointLat?.toFixed(2)}`}</div>
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
