import React from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"

export default function Competitions() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Your tournament</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained" /*onClick={deleteButton}*/> Delete </Button>
                    <Button variant="contained" /*onClick={modifyButton}*/> Modify </Button>
                    <Button variant="contained" /*onClick={createButton}*/> Create </Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <p>Test</p>
                <div className="TableGrid">

                </div>
            </div>
        </div>
    )
}