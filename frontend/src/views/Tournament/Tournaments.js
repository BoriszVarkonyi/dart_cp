import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { get, remove } from "../../services/backend.service";
import { useSelector } from "react-redux";
import useSingleRowSelection from "../../services/useSingleRowSelection";

const row = (element) => {
  return {
    id: element.id,
    tournamentName: element.title_long,
    startingDate: element.starting_date,
    endingDate: element.ending_date,
  };
};

//Sets the columns
const columns = [
  { field: "tournamentName", headerName: "Name", width: 200 },
  { field: "startingDate", headerName: "Starting Date", width: 200 },
  { field: "endingDate", headerName: "Ending Date", width: 200 },
];

export default function Tournaments() {
  //Makes only one row selected
  const { isSelected, selectedRowId, selectionModel, handleEvent } = useSingleRowSelection();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  //Gets the tournaments from api
  useEffect(() => {
    async function getData() {
      const data = await get("tournaments/");
      const rows = data.map((e) => row(e));
      setRows(rows);
    }
    getData();
  }, []);

  if (!isLoggedIn) {
    return navigate("/");
  }

  //Button functions
  const openButton = () => {};

  const modifyButton = () => {
    navigate("modify_tournament", { state: {rowId: selectedRowId }});
  };

  const deleteButton = async () => {
    //Deletes the tournament in the database
    await remove(`tournaments/${selectedRowId}/`);

    //Deletes the row in the data grid
    setRows((prevRows) => {
      const rowToDeleteIndex = prevRows.findIndex(
        (row) => row.id == selectedRowId
      );
      return [
        ...rows.slice(0, rowToDeleteIndex),
        ...rows.slice(rowToDeleteIndex + 1),
      ];
    });
  };

  return (
    <div className="Panel">
      <div className="PageHeader">
        <h2 className="PageTitle">Your tournament</h2>
        <div className="PageButtonsWrapper">
          {/*Conditonal rendering by isSelected state*/}
          {!isSelected && (
            <Button
              variant="contained"
              onClick={() => navigate("create_tournament")}
            >
              Create
            </Button>
          )}
          {isSelected && (
            <Button variant="contained" onClick={deleteButton}>
              Delete
            </Button>
          )}
          {isSelected && (
            <Button variant="contained" onClick={modifyButton}>
              Modify
            </Button>
          )}
          {isSelected && (
            <Button variant="contained" onClick={openButton}>
              Open
            </Button>
          )}
        </div>
      </div>
      <div className="PanelContentSingle">
        <div className="TableGrid">
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              checkboxSelection={true}
              selectionModel={selectionModel}
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
