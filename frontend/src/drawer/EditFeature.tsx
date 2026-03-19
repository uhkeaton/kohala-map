import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

interface EditFeatureDialogProps {
  open: boolean;
  formData: {
    title: string;
    description: string;
    titleHawaiian: string;
    descriptionHawaiian: string;
    imgSrc: string;
    id: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function EditFeatureDialog({ open, onClose, formData, onChange, onSubmit }: EditFeatureDialogProps)
{
    return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Feature</DialogTitle>
      <DialogContent>
        <TextField
          label="Feature Title"
          name="title"
          value={formData.title}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={onChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Hawaiian Title"
          name="titleHawaiian"
          value={formData.titleHawaiian}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Hawaiian Description"
          name="descriptionHawaiian"
          value={formData.descriptionHawaiian}
          onChange={onChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Image Source"
          name="imgSrc"
          value={formData.imgSrc}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Save Changes
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};