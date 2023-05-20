import React, { useState } from "react";
import { useCrossTabState } from "../../../services/crosstab.service";
import { json, useParams } from "react-router-dom";
import { useEffect } from "react";
import Report from "./Report";
import { Button } from "@mui/material";

export default function WCLiveReports() {
  const { tournamentId } = useParams();
  const test = localStorage.getItem(tournamentId + "_weapon_control_report");
  const [reports, setReports] = useState([]);
  const [wcReport, setWcReport] = useCrossTabState(
    tournamentId + "_weapon_control_report",
    []
  );
  const [previousReport, setPreviousReport] = useState();
  useEffect(() => {
    //console.log(wcReport)
    //Checks if wcReport is empty. It is needed because of the React rendering behaviour. Also checks if there is any change.
    //Compare arrays with JSON.stringify.
    if (
      wcReport.length != 0 &&
      JSON.stringify(wcReport) != JSON.stringify(previousReport)
    ) {
      setPreviousReport(wcReport);
      const reportArray = wcReport.map((e) => {
        return <Report key={e.fName[0] + e.fNat[0] + e.key} props={e} />;

      });
      setReports(reportArray);
      //If there is 0 reports I assume there was a reload, or the page just opened. Therefore I need to display both reports.
      // if (reports.length == 0) {
      // const reportArray = wcReport.map((e) => <Report key={e.fName + e.fNat} props={e} />)
      // setReports(reportArray)
      // } else {
      //   const reportComp = <Report key={wcReport[0].fName + wcReport[0].fNat} props={wcReport[0]} />
      //   setReports(current => [reportComp, ...current])
      // }
    }
  }, [wcReport]);
  return (
    <>
      {reports.length > 0 && (
        <Button
          variant="contained"
          size="small"
          type="submit"
          form="issue-form"
          onClick={() => {
            setReports([]);
            setWcReport([]);
          }}
        >
          Clear Reports
        </Button>
      )}
      {reports.length > 0? (reports) : (<p>The is no Reports yet</p>)}
    </>
  );
}
