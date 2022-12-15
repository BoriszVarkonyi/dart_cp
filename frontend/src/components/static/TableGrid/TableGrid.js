import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import datas from "../../../assets/MOCK_DATA.json";
import { chainPropTypes } from "@mui/utils";

//Generates the rows
const rows = datas.map(function callback(element) {
  return {
    id: element.id,
    tournamentName: element.name,
    startingDate: element.starting_date,
    endingDate: element.ending_date,

  };
});

//Sets the columns
const columns = [
  { field: "tournamentName", headerName: "Name", width: 200 },
  { field: "startingDate", headerName: "Starting Date", width: 200 },
  { field: "endingDate", headerName: "Ending Date", width: 200 },
];

export default function TableGrid(props) {

  //When a row is selected this function is called
  const handleEvent = (params) => {
    console.log(props.isSelected)
  };

  return (
    <div className="TableGrid">
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid onRowClick={handleEvent} rows={rows} columns={columns} />
      </div>
    </div>
  );
}
