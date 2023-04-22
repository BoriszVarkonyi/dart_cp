import React from "react";
import PrintTable from "../../../components/static/PrintTable/PrintTable";
import WCPrintHeader from "./WCPrintHeader";

export default function PrintCell(props) {
  const prop = props.props;
  console.log(prop)
  return (
    // <div className="CountryCell">
    //   <p className="CountryName">{prop.longName}</p>
    //   <div className="CountryData">
    //     <p>{prop.fencerNum} fencers</p>
    //     <b>{prop.issueNum} issues</b>
    //     <p>{prop.ratio} ratio</p>
    //   </div>
    //   <div className="CountryContent">
    //     <PrintTable row={prop.row} col={prop.col} sorting={{ field: "freq" }} />
    //   </div>
    // </div>

    <div className="DocumentPage">
      {/* <WCPrintHeader {...headerProps} /> */}
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
