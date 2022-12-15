import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import datas from "../../assets/MOCK_DATA.json";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

export default function Tournaments() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const navigate = useNavigate();

  const handleRowData = (params) => {
    return setSelectedRow(params);
  };

  //Button functions
  const openButton = () => {
    console.log(selectedRow.row.tournamentName)
  };

  const modifyButton = () => {
    console.log("modify gomb megnyomvaaaaa");
  };

  const deleteButton = () => {
    console.log("delete gomb megnyomvaaaaa");
  };

  const createButton = () => {
    navigate("/panel/createtournament")
  };

  //When a row is selected it handles the selected state
  const handleEvent = (params) => {
    params.length == 1 ? setIsSelected(true) : setIsSelected(false);
  };

  return (
    <div className="Panel">
      <div className="PageHeader">
        <h2>Your tournament</h2>
        <div>
          {/*Conditonal rendering by isSelected state*/}
          {!isSelected && <Button variant="contained" onClick={createButton}> Create </Button>}
          {isSelected && <Button variant="contained" onClick={deleteButton}> Delete </Button>}
          {isSelected && <Button variant="contained" onClick={modifyButton}> Modify </Button>}
          {isSelected && <Button variant="contained" onClick={openButton}> Open </Button>}
        </div>
      </div>
      <div className="PanelContent">
        <div className="TableGrid">
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              onRowClick={handleRowData}
              onSelectionModelChange={handleEvent}
              rows={rows}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
