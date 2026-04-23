import { useState } from "react";
import { useGlobal } from "./useGlobal";
import { Button, TextareaAutosize } from "@mui/material";
import { featureToRow, rowToFeature, SpreadsheetRow } from "./data/spreadsheet";
import { ID_EDITED_FEATURE } from "./feature";
import { Box, FormControl, NativeSelect } from "@mui/material";
import { ChangeEventHandler } from "react";
import { featuresByGroup } from "./feature";

export function FeatureEditStartFromExisting() {
  const [value, setValue] = useState("");
  const { features, headers, setEditedFeature } = useGlobal();

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const id = event.target.value;
    setValue(id);
  };

  const handleSubmit = () => {
    const columnValues = value.split("\t");

    const row = Object.fromEntries(
      headers.map((h, i) => {
        const val = columnValues[i];
        return [h, val];
      }),
    ) as SpreadsheetRow;

    const feature = rowToFeature(row, ID_EDITED_FEATURE);
    setEditedFeature(feature);
    setValue("");
  };
  // group by group property
  const groupedFeatures = featuresByGroup(features);

  return (
    <>
      <div className="text-xl mb-4">Start From Existing</div>
      <div className="p-2 mb-2">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <NativeSelect
              id="feature-native"
              value={value || ""}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select a feature to copy
              </option>

              {groupedFeatures.map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map((item) => (
                    <option key={item.id} value={featureToRow(item, headers)}>
                      {item.infoTitle}
                    </option>
                  ))}
                </optgroup>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
      </div>
      <div className="mb-4 bg-neutral-300/15 rounded-lg">
        <TextareaAutosize
          id="paste"
          placeholder="Paste Existing Row Here"
          value={value}
          onChange={(event) => {
            const val = event.target.value;
            setValue(val);
          }}
          minRows={2}
          maxRows={8}
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <div className="flex w-full justify-end">
        <Button
          disabled={value == ""}
          variant="contained"
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </div>
    </>
  );
}
