import { Button, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import { useGlobal } from "../global/useGlobal";
import  { EditFeatureDialog }  from "./EditFeature"
import { FormData } from "../types/types"

export function EditMode() {
  const { visibleFeature, 
    mapConfig,
    features,
    editMode,
    setEditMode,
    handleEnterEditMapConfig, 
    handleExitEditMapConfig,
    changeFeature } = useGlobal();
  
  const[formOpen, setFormOpen] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    title: visibleFeature?.title || "",
    description: visibleFeature?.description || "",
    titleHawaiian: visibleFeature?.titleHawaiian || "",
    descriptionHawaiian: visibleFeature?.descriptionHawaiian || "",
    imgSrc: visibleFeature?.imgSrc || "",
    id: visibleFeature?.id || "" // Should always stay the same
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
      setFormOpen(false);
      console.log(features);
      changeFeature(formData);
    }
  };

  const handleCancel = () => {
    handleExitEditMapConfig()
    setFormOpen(false)
  };

  return (
    <div className="my-2">
      <FormControlLabel
        control={
          <Switch
            checked={editMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEditMode(e.target.checked);
              console.log("Edit mode is now", e.target.checked);
              handleEnterEditMapConfig();
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
