import React from "react";
import PrintTable from "../../../components/static/PrintTable/PrintTable";

export default function PrintCell(props) {
  const prop = props.props;
  return (
    <div className="CountryCell">
      <p className="CountryName">{prop.longName}</p>
      <div className="CountryData">
        <p>{prop.fencerNum} fencers</p>
        <b>{prop.issueNum} issues</b>
        <p>{prop.ratio} ratio</p>
      </div>
      <div className="CountryContent">
        <PrintTable row={prop.row} col={prop.col} sorting={{ field: "freq" }} />
      </div>
    </div>
  );
}
