import React from "react";
import PrintTable from "../../../components/static/PrintTable/PrintTable";
import WCPrintHeader from "./WCPrintHeader";

export default function PrintCell(props) {
  const prop = props.props
  const header = props.printHeader
  return (
    <div className="DocumentPage">
      <WCPrintHeader {...header} />
      <div className="DocumentSectionTitle">COUNTRIES' ISSUES DETAIL</div>
      <p className="DocumentSectionSubtitle">{prop.longName}</p>
      <div className="DocumentSection DocumentColumnLayout TwoColumns">
        <div>
          <p>NUMBER OF FENCERS:</p>
          <p>NUMBER OF ISSUES:</p>
          <p>RATIO:</p>
        </div>
        <div>
          <p>{prop.fencerNum}</p>
          <p>{prop.issueNum}</p>
          <p>{prop.ratio}</p>
        </div>
      </div>
      <div className="DocumentSection Growable FullPage">
      <PrintTable row={prop.row} col={prop.col} sorting={{ field: "freq" }} />
      </div>
    </div>
  );
}
