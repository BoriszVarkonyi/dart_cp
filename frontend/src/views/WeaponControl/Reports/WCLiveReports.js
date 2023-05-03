import React, { useState } from "react";
import { useCrossTabState } from "../../../services/crosstab.service";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Report from "./Report";

export default function WCLiveReports() {
  const { tournamentId } = useParams();
  const [reports, setReports] = useState([]);



  return <main>
    {reports}
  </main>;
}
