import React from "react";
import { Button } from "@mui/material";

export default function Registration() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Registration</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained" size="small">Print Barcodes</Button>
                    <Button variant="contained" size="small">Register out</Button>
                    <Button variant="contained" size="small">Register in</Button>
                    <Button variant="contained" size="small">Assign Barcode</Button>
                </div>
            </div>
            <div className="PageContent">
                <div className="TableGrid">

                </div>
            </div>
        </div>
    )
}