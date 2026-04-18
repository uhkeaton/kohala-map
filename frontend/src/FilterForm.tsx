import { Box, Slider, Typography } from "@mui/material";
import { FilterProperty } from "./filter";

export type CssFilter = {
  hueRotate?: number; // deg
  saturate?: number;
  brightness?: number;
  contrast?: number;
  grayscale?: number; // 0–1
  sepia?: number; // 0–1
  invert?: number; // 0–1
  opacity?: number; // 0–1
};

const IDENTITY: Required<CssFilter> = {
  hueRotate: 0,
  saturate: 1,
  brightness: 1,
  contrast: 1,
  grayscale: 0,
  sepia: 0,
  invert: 0,
  opacity: 1,
};

type Props = {
  value: CssFilter;
  onChange: (next: CssFilter) => void;
  allow: FilterProperty[];
};

export function FilterForm({ value, onChange, allow }: Props) {
  const set = (key: keyof CssFilter, v: number) => {
    onChange({
      ...value,
      [key]: v,
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} width={320}>
      {allow?.includes("hue-rotate") && (
        <FilterSlider
          label="Hue Rotate"
          value={value.hueRotate ?? IDENTITY.hueRotate}
          min={-180}
          max={180}
          step={1}
          onChange={(v) => set("hueRotate", v)}
        />
      )}
      {allow?.includes("saturate") && (
        <FilterSlider
          label="Saturate"
          value={value.saturate ?? IDENTITY.saturate}
          min={0}
          max={3}
          step={0.01}
          onChange={(v) => set("saturate", v)}
        />
      )}
      {allow?.includes("brightness") && (
        <FilterSlider
          label="Brightness"
          value={value.brightness ?? IDENTITY.brightness}
          min={0}
          max={3}
          step={0.01}
          onChange={(v) => set("brightness", v)}
        />
      )}
      {allow?.includes("opacity") && (
        <FilterSlider
          label="Opacity"
          value={value.opacity ?? IDENTITY.opacity}
          min={0}
          max={1}
          step={0.01}
          onChange={(v) => set("opacity", v)}
        />
      )}
    </Box>
  );
}

function FilterSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <Box>
      <Typography gutterBottom>
        {label}: {value.toFixed(2)}
      </Typography>

      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_, v) => onChange(v as number)}
      />
    </Box>
  );
}
