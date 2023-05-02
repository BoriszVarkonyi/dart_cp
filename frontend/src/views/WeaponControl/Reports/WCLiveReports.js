import React, { useState } from "react";
import { useCrossTabState } from "../../../services/crosstab.service";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Report from "./Report";

export default function WCLiveReports() {
  const { tournamentId } = useParams();
  const [wcReport, setWcReport] = useCrossTabState(
    tournamentId + "_weapon_control_report",
    []
  );
  const [reports, setReports] = useState([]);


  useEffect(() => {
    if (wcReport.length > 0 && !reports.includes(wcReport)) {
      setReports((prevState) => [...prevState, ...[test]]);
    }
  }, [wcReport]);


  return <main>
    {reports}
  </main>;
}
