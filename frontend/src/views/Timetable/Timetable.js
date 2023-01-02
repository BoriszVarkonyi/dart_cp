import React from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Timetable() {
    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Timetable</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained">
                        Delete
                    </Button>
                    <Button variant="contained">
                        Modify
                    </Button>
                    <Button variant="contained">
                        Create
                    </Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <div className="TableGrid">
                    <div style={{ height: 300, width: "100%" }}>
                        <DataGrid
                            checkboxSelection={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}