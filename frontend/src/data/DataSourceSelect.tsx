import { useGlobal } from "../useGlobal";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { permanentDataSources } from "./dataSource";

export function DataSourceSelect() {
  const { spreadsheetId, savedDataSources } = useGlobal();

  const { handleChangeSpreadsheetId } = useGlobal();

  const Options = [...permanentDataSources, ...savedDataSources].map((item) => {
    return <MenuItem value={item.id}>{item.title}</MenuItem>;
  });

  const handleChange = (event: SelectChangeEvent) => {
    handleChangeSpreadsheetId(event.target.value);
  };

  return (
    <div className="mb-4">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Source</InputLabel>
          <Select value={spreadsheetId} label="Feature" onChange={handleChange}>
            {Options}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
