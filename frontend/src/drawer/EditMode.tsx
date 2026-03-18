import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useGlobal } from "../global/useGlobal";

export function EditMode() {
  const { visibleFeature, 
    mapConfig,
    features,
    handleEnterEditMapConfig, 
    handleExitEditMapConfig } = useGlobal();
  
  const[editMode, setEditMode] = useState(false)

  const [formData, setFormData] = useState({
    title: visibleFeature?.title || "",
    description: visibleFeature?.description || "",
    titleHawaiian: visibleFeature?.titleHawaiian || "",
    descriptionHawaiian: visibleFeature?.descriptionHawaiian || "",
    imgSrc: visibleFeature?.imgSrc || "",
  });

  const handleClick = () => {
    if(editMode) 
    {
      handleEnterEditMapConfig(); // Once in edit mode, will be working on "fake" map settings / features for now.
    }
    else
    {
      handleExitEditMapConfig()
    }
    setEditMode(!editMode)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (visibleFeature) {
      // TODO: Add something to make it change the feature
      console.log("Lol")
    }
  };

  const handleCancel = () => {
    handleExitEditMapConfig()
  };

  return (
    <div className="my-2">
      <Button className="w-full" onClick={handleClick} variant="outlined">
        {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
      </Button>

      {/* Modal Popup Form using Dialog */}
      <Dialog open={editMode} onClose={handleCancel}>
        <DialogTitle>Edit Feature</DialogTitle>
        <DialogContent>
          <TextField
            label="Feature Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            label="Hawaiian Title"
            name="titleHawaiian"
            value={formData.titleHawaiian}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Hawaiian Description"
            name="descriptionHawaiian"
            value={formData.descriptionHawaiian}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            label="Image Source"
            name="imgSrc"
            value={formData.imgSrc}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
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
