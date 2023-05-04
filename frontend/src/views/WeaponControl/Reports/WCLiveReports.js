import React, { useState } from "react";
import { useCrossTabState } from "../../../services/crosstab.service";
import { json, useParams } from "react-router-dom";
import { useEffect } from "react";
import Report from "./Report";

export default function WCLiveReports() {
  const { tournamentId } = useParams();
  const [reports, setReports] = useState([]);
  const [wcReport, setWcReport] = useCrossTabState(
    tournamentId + "_weapon_control_report",
    []
  );
  const [previousReport, setPreviousReport] = useState();

  useEffect(()=>{
    //Checks if wcReport is empty. It is needed because of the React rendering behaviour. Also checks if there is any change. 
    //Compare arrays with JSON.stringify.
    if(wcReport.length != 0 && JSON.stringify(wcReport)  != JSON.stringify(previousReport)){
      setPreviousReport(wcReport)
      //If there is 0 reports I assume there was a reload, or the page just opened. Therefore I need to display both reports.
      if(reports.length == 0){
        const reportArray = wcReport.map((e)=><Report key={e.fName + e.fNat} props={e}/>)
        setReports(reportArray)
      }else{
        const reportComp = <Report key={wcReport[0].fName + wcReport[0].fNat} props={wcReport[0]}/>
        setReports(current => [reportComp, ...current])
      }
    }
  },[wcReport])


  return <main>
    <div className="PageContent">
      {reports}
    </div>
  </main>;
}
