import React from "react";
import "./ReportLayout.css";
import "../../static/Header/Header.css";
import WCLiveReports from "../../../views/WeaponControl/Reports/WCLiveReports";

export default function ReportLayout() {
    return (
        <div id="ReportLayout">
            <header>
                <div id="HeaderTitle">
                    <p id="AppName">d'ARTAGNAN COMPETITION CONTROL</p>
                </div>
            </header>
            <div id="ReportsWrapper">
                <p id="ReportPageTitle">WEAPON CONTROL REPORTS</p>
                <div id="Reports">
                    <WCLiveReports />
                </div>
            </div>
        </div>
    )
}