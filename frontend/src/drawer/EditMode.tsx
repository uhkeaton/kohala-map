import { Button } from "@mui/material";
import { useState } from "react";

interface EditModeProps {
    editMode: boolean;
    setEditMode: (value: boolean) => void;
}

export function EditMode({ editMode, setEditMode}: EditModeProps) {
    

    const handleClick = () => {
        setEditMode(!editMode);
    };
    
    return(
        <div className="my-2">
        <Button
          className="w-full"
          onClick={handleClick}
          variant="outlined"
        >
          {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        </Button>
        </div>
    );
}