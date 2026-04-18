import { Slider } from "@mui/material";
import {
  CssFilter,
  fromCssFilterString,
  IDENTITY_FILTER,
  toCssFilterString,
} from "./filter";

const NUM_SAMPLES = 32;
const HUE_MIN = -180;
const HUE_MAX = 180;
const SAT_MIN = 0;
const SAT_MAX = 3;
const BRIGHT_MIN = 0;
const BRIGHT_MAX = 3;

// linear interpolation
function lerp(percent: number, min: number, max: number): number {
  return min + (max - min) * percent;
}

function Samples({
  filter,
  override,
}: {
  filter: CssFilter;
  override: (percent: number) => Partial<CssFilter>;
}) {
  return (
    <div className="flex absolute inset-0 w-full h-full rounded-lg overflow-hidden">
      {new Array(NUM_SAMPLES).fill(0).map((_, i) => {
        const percent = i / (NUM_SAMPLES - 1);

        const filterString = toCssFilterString({
          brightness: filter.brightness,
          hueRotate: filter.hueRotate,
          saturate: filter.saturate,
          ...override(percent),
        });

        return (
          <div
            style={{
              background: "red",
              filter: filterString,
            }}
            className="flex-1"
          />
        );
      })}
    </div>
  );
}

type Props = {
  value: CssFilter;
  onChange: (next: CssFilter) => void;
  type: "hsb" | "hsbo";
};

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

export function FilterForm({ value, onChange, type }: Props) {
  const set = (key: keyof CssFilter, v: number) => {
    onChange({
      ...value,
      [key]: v,
    });
  };

  //
  const curr = fromCssFilterString(value);

  //

  return (
    <div className="grid grid-cols-[max-content_1fr] gap-4">
      <div className="">Hue</div>
      <div className="relative w-full">
        <Samples
          filter={curr}
          override={(percent) => ({
            hueRotate: lerp(percent, HUE_MIN, HUE_MAX),
          })}
        />
        <Slider
          sx={sliderStyles}
          value={value.hueRotate ?? IDENTITY_FILTER.hueRotate}
          min={HUE_MIN}
          max={HUE_MAX}
          step={1}
          onChange={(_, v) => set("hueRotate", v)}
        />
      </div>
      <div className="">Saturate</div>
      <div className="relative w-full">
        <Samples
          filter={curr}
          override={(percent) => ({
            saturate: lerp(percent, SAT_MIN, SAT_MAX),
          })}
        />
        <Slider
          sx={sliderStyles}
          value={value.saturate ?? IDENTITY_FILTER.saturate}
          min={SAT_MIN}
          max={SAT_MAX}
          step={0.01}
          onChange={(_, v) => set("saturate", v)}
        />
      </div>
      <div className="">Brightness</div>
      <div className="relative w-full">
        <Samples
          filter={curr}
          override={(percent) => ({
            brightness: lerp(percent, BRIGHT_MIN, BRIGHT_MAX),
          })}
        />
        <Slider
          sx={sliderStyles}
          value={value.brightness ?? IDENTITY_FILTER.brightness}
          min={BRIGHT_MIN}
          max={BRIGHT_MAX}
          step={0.01}
          onChange={(_, v) => set("brightness", v)}
        />
      </div>
      {type == "hsbo" && (
        <Slider
          //   label="Opacity"
          //   value={value.opacity ?? IDENTITY.opacity}
          min={0}
          max={1}
          step={0.01}
          onChange={(_, v) => set("opacity", v)}
        />
      )}
    </div>
  );
}
