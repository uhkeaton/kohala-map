import Dialog from "@mui/material/Dialog";
import { Button, Divider } from "@mui/material";
import { useGlobal } from "../global/useGlobal";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { dataSourceOptions } from "./dataSourceOptions";
import { useSpreadsheet } from "./spreadsheet";

export function EditDataSettings() {
  const { displaySettings, setDisplaySettings } = useGlobal();

  //   const { createRoomMutation } = useRoomCode();

  //   function createRoom() {
  //     setDisplaySettings((s) => ({
  //       ...s,
  //       showCreateRoomDialog: false,
  //       showShareRoomDialog: true,
  //     }));
  //     createRoomMutation.mutate();
  //   }

  const handleClose = () => {
    setDisplaySettings((s) => ({ ...s, showDialogDataSource: false }));
  };

  const handleOpen = () => {
    setDisplaySettings((s) => ({ ...s, showDialogDataSource: true }));
  };

  return (
    <div>
      <DataSelect />
    </div>
  );

  return (
    <>
      <Button className="w-full" onClick={handleOpen} variant="outlined">
        Edit
      </Button>
      <Dialog
        maxWidth="sm"
        onClose={handleClose}
        open={displaySettings.showDialogDataSource}
      >
        <div className="flex flex-col items-center px-4">
          <div>
            <div className="p-4 text-2xl font-bold">Data Source</div>
            <Divider sx={{ width: "100%" }} />
            <div className="p-4 pb-8">
              <div className="mb-8 text-lg">Change data source</div>
              <div>
                <DataSelect />
              </div>
              {/* <div className="my-4">
                <Button
                  className="w-full"
                  //   onClick={createRoom}
                  variant="contained"
                >
                  Create Room
                </Button>
              </div> */}
              <div className="my-4">
                <Button
                  className="w-full"
                  onClick={handleClose}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export function DataSelect() {
  const { spreadsheetId } = useGlobal();

  const { handleChangeSpreadsheetId } = useGlobal();

  const Options = dataSourceOptions.map((item) => {
    return <MenuItem value={item.id}>{item.title}</MenuItem>;
  });

  const handleChange = (event: SelectChangeEvent) => {
    handleChangeSpreadsheetId(event.target.value);
  };

  return (
    <div className="w-full h-full">
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
