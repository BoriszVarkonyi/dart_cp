import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid } from "@mui/x-data-grid"

export default function Competitions() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Competitions</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained" size="small" startIcon={<DeleteIcon />} /*onClick={deleteButton}*/>Delete</Button>
                    <Button variant="contained" size="small" startIcon={<EditIcon />} /*onClick={modifyButton}*/>Modify</Button>
                    <Button variant="contained" size="small" startIcon={<AddIcon />} /*onClick={createButton}*/>Create</Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <div className="TableGrid">

                </div>
            </div>
        </div>
    )
}