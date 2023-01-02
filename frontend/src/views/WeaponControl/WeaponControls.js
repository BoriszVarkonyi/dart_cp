import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"
import BarCodeIcon from "@mui/icons-material/CropFree"

export default function WeaponControl() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Weapon Control</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained" size="small" startIcon={<DeleteIcon />}>Remove</Button>
                    <Button variant="contained" size="small" startIcon={<EditIcon />}>Modify</Button>
                    <Button variant="contained" size="small" startIcon={<AddIcon />}>Add</Button>
                    <Button variant="contained" size="small" startIcon={<BarCodeIcon />}>Read Barcode</Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <div className="TableGrid">

                </div>
            </div>
        </div>
    )
}