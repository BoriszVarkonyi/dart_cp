import React from "react";
import { Button } from "@mui/material";

export default function Competitor() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Add Competitor // *Competitor name*</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained">Cancel</Button>
                    <Button variant="contained">Add // Save Changes</Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <div className="TableGrid">

                </div>
            </div>
        </div>
    )
}