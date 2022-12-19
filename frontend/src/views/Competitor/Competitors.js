import React from "react";
import { Button } from "@mui/material";

export default function Competitors() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Competitors</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained">Import XML</Button>
                    <Button variant="contained" /*onClick={deleteButton}*/>Delete</Button>
                    <Button variant="contained" /*onClick={modifyButton}*/>Modify</Button>
                    <Button variant="contained" /*onClick={createButton}*/>Create</Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <div className="TableGrid">

                </div>
            </div>
        </div>
    )
}