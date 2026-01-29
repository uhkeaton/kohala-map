import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useSpreadsheet } from "../spreadsheet/spreadsheet";  // Assuming updateFeature function is here

interface EditModeProps {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

export function EditMode({ editMode, setEditMode }: EditModeProps) {
  const { visibleFeature } = useSpreadsheet();

  const [formData, setFormData] = useState({
    title: visibleFeature?.title || "",
    description: visibleFeature?.description || "",
    titleHawaiian: visibleFeature?.titleHawaiian || "",
    descriptionHawaiian: visibleFeature?.descriptionHawaiian || "",
    imgSrc: visibleFeature?.imgSrc || "",
  });

  const handleClick = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (visibleFeature) {
      // TODO: Add something to make it change the feature
      setEditMode(false); 
    }
  };

  const handleCancel = () => {
    setEditMode(false)
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
