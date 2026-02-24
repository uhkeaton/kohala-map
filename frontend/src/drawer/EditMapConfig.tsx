import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { useGlobal } from "../global/useGlobal";


export function EditMapConfig() {

    const [openState, setOpenState] = useState(false)
    const { mapConfig, setEditedMapConfig, handleEnterEditMapConfig, handleExitEditMapConfig } = useGlobal();

    const handleClick = () => {
        setOpenState(true)
        handleEnterEditMapConfig()
    };

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined =
        (e) => {
            
            setEditedMapConfig(s => {
                if (!s) return s
                return {...s, "mapImgSrc": e.target.value}
            })
        }


    const handleCancel = () => {
        setOpenState(false)
        handleExitEditMapConfig()
    };

    return (
        <div className="my-2">
            <Button className="w-full" onClick={handleClick} variant="outlined">
                {"Enter Edit Mode"}
            </Button>

            {/* Modal Popup Form using Dialog */}
            <Dialog open={openState} onClose={handleCancel}>
                <DialogTitle>Edit Map Config</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Feature Title"
                        name="title"
                        value={mapConfig.mapImgSrc}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleCancel}>
                        Save Changes
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
