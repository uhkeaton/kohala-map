import Dialog from "@mui/material/Dialog";
import { Button, Divider, TextField } from "@mui/material";
import { useGlobal } from "../useGlobal";
import { addItem, removeItem } from "./dataSource";
import { useState } from "react";
import toast from "react-hot-toast";
import { ButtonDelete } from "../ButtonDelete";

export function DataSourceCreateDialog() {
  const { savedDataSources, setSavedDataSources, handleChangeSpreadsheetId } =
    useGlobal();

  const [title, setTitle] = useState("Untitled");
  const [googleLink, setGoogleLink] = useState("");
  const sheetId = getGoogleSheetId(googleLink);

  const { displaySettings, setDisplaySettings } = useGlobal();

  function createDataSource() {
    if (!sheetId) {
      toast.error(
        `Problem extracting id from google sheets link: ${googleLink}`,
      );
      return;
    }
    if (!title) {
      toast.error(`Missing Title`);
      return;
    }

    setSavedDataSources(addItem(sheetId, title));
  }

  const handleClose = () => {
    setDisplaySettings((s) => ({ ...s, showDialogDataSourceCreate: false }));
  };

  const handleOpen = () => {
    setDisplaySettings((s) => ({ ...s, showDialogDataSourceCreate: true }));
  };

  return (
    <>
      <Button className="w-full" onClick={handleOpen} variant="outlined">
        Add Data Source
      </Button>
      <Dialog
        maxWidth="xs"
        fullWidth
        onClose={handleClose}
        open={displaySettings.showDialogDataSourceCreate}
      >
        <div className="p-4">
          {/* <div className="p-4 text-2xl font-bold">Data Sources</div>
          <Divider sx={{ width: "100%" }} /> */}

          <div className="text-xl mb-6">Add Data Source</div>
          <div className="mb-6">
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const val = event.target.value;
                setTitle(val);
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="link"
              label="Paste Google Sheets Link"
              variant="outlined"
              fullWidth
              multiline
              value={googleLink}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const val = event.target.value;
                setGoogleLink(val);
              }}
            />
          </div>
          <div className="mb-4 opacity-70">
            * Google sheets links should start with{" "}
            <i>https://docs.google.com/spreadsheets/d/</i>
          </div>
          <div className="my-4">
            <Button
              disabled={!sheetId || !title}
              className="w-full"
              onClick={createDataSource}
              variant="contained"
            >
              Add
            </Button>
          </div>
          <Divider sx={{ width: "100%" }} />
          <div className="pt-4">
            <div className="text-xl mb-6">Data Sources</div>
            {savedDataSources?.map((item) => {
              return (
                <div className="border border-neutral-300/20 my-2 rounded cursor-pointer">
                  <div
                    onClick={() => {
                      handleChangeSpreadsheetId(item.id);
                    }}
                    className="w-full h-full p-3 flex items-center"
                  >
                    <div className="flex-1">{item.title}</div>
                    <div>
                      <ButtonDelete
                        onClick={(e) => {
                          e.stopPropagation();
                          setSavedDataSources(removeItem(item.id));
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="mt-4">
              <Button
                className="w-full"
                onClick={handleClose}
                variant="outlined"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function getGoogleSheetId(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}
