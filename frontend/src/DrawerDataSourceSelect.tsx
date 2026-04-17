import { dataSourceOptions } from "./drawerDataSourceSelectOptions";
import { useGlobal } from "./useGlobal";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export function DrawerDataSourceSelect() {
  const { spreadsheetId } = useGlobal();

  const { handleChangeSpreadsheetId } = useGlobal();

  const Options = dataSourceOptions.map((item) => {
    return <MenuItem value={item.id}>{item.title}</MenuItem>;
  });

  const handleChange = (event: SelectChangeEvent) => {
    handleChangeSpreadsheetId(event.target.value);
  };

  return (
    <div>
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
