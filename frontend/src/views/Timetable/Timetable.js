import React from "react";
import { Button } from "@mui/material";

export default function Timetable() {
    console.log("help");
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Timetable</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained" size="small">REMOVE WEAPON CONTROL PERIOD</Button>
                    <Button variant="contained" size="small">MODIFY WEAPON CONTROL PERIOD</Button>
                    <Button variant="contained" size="small">ADD WEAPON CONTROL PERIOD</Button>
                    <Button variant="contained" size="small">OPEN BOOKINGS</Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <div className="TableGrid">
                    <div style={{ height: 300, width: "100%" }}>
                        <h1>Timetable</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
