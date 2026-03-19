import { Button, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import { useGlobal } from "../global/useGlobal";
import  { EditFeatureDialog }  from "./EditFeature"

export function EditMode() {
  const { visibleFeature, 
    mapConfig,
    features,
    handleEnterEditMapConfig, 
    handleExitEditMapConfig } = useGlobal();
  
  const[editMode, setEditMode] = useState(false)
  const[formOpen, setFormOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: visibleFeature?.title || "",
    description: visibleFeature?.description || "",
    titleHawaiian: visibleFeature?.titleHawaiian || "",
    descriptionHawaiian: visibleFeature?.descriptionHawaiian || "",
    imgSrc: visibleFeature?.imgSrc || "",
    id: visibleFeature?.id || ""
  });

  const handleClick = () => {
    if(editMode) 
    {
      setFormOpen(true)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (visibleFeature) {
      // TODO: Add something to make it change the feature
      console.log("This is what formdata looks like: ", formData);
      console.log(features)
      setFormOpen(false)
    }
  };

  const handleCancel = () => {
    handleExitEditMapConfig()
    setEditMode(false)
    setFormOpen(false)
  };



  return (
    <div className="my-2">
      <FormControlLabel
        control={
          <Switch
            checked={editMode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditMode(event.target.checked);
              console.log("Edit mode is now", event.target.checked);
            }}
          />
        }
        label="Edit Mode"
      />
      <Button className="w-full" onClick={handleClick} variant="outlined" disabled={!editMode}>
        Edit Feature
      </Button>
          
      {/* Modal Popup Form using Dialog */}
      <EditFeatureDialog
        open={formOpen}      
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={handleCancel}
      />
    </div>
  );
}
