import React from "react";
import { Button } from "@mui/material";

export default function Timetable() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Timetable</h2>
                <div className="PageButtonsWrapper">
                    <Button
                        variant="contained"
                        size="small">
                        REMOVE WEAPON CONTROL PERIOD
                    </Button>
                    <Button
                        variant="contained"
                        size="small">
                        MODIFY WEAPON CONTROL PERIOD
                    </Button>
                    <Button
                        variant="contained"
                        size="small">
                        ADD WEAPON CONTROL PERIOD
                    </Button>
                    <Button
                        variant="contained"
                        size="small">
                        OPEN BOOKINGS
                    </Button>
                </div>
            </div>
            <div className="PageContent">
            </div>
        </div>
    );
}
