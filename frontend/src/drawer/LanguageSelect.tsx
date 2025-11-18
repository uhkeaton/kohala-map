import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { useGlobal } from "../global/useGlobal";
import type { DisplaySettings } from "../types/types";

export function LanguageSelect() {
  const { displaySettings, setDisplaySettings } = useGlobal();

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setDisplaySettings((s) => ({
      ...s,
      language: value as DisplaySettings["language"],
    }));
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={displaySettings.language}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="eng">English</ToggleButton>
        <ToggleButton value="haw">ʻŌlelo Hawaiʻi</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
