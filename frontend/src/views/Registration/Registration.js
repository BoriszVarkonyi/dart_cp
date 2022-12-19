import React from "react";
import { Button } from "@mui/material";

export default function Registration() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Registration</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained">Print Barcodes</Button>
                    <Button variant="contained">Register out</Button>
                    <Button variant="contained">Register in</Button>
                    <Button variant="contained">Assign Barcode</Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <div className="TableGrid">

                </div>
            </div>
        </div>
    )
}