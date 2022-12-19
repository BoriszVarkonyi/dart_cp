import React from "react";
import { Button } from "@mui/material";

export default function WeaponControl() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Weapon Control</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained">Remove</Button>
                    <Button variant="contained">Modify</Button>
                    <Button variant="contained">Add</Button>
                    <Button variant="contained">Read Barcode</Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <div className="TableGrid">

                </div>
            </div>
        </div>
    )
}