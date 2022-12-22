import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { get, remove } from "../../services/backend.service";
import { useSelector } from "react-redux";

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
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

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

  //Makes only one row selected
  const handleEvent = (params) => {
    if (params.length > 1) {
      const selectionSet = new Set(selectionModel);
      const result = params.filter((s) => !selectionSet.has(s));
      setSelectionModel(result);
    } else {
      setSelectionModel(params);
    }
  };

  useEffect(() => {
    selectionModel.length == 1 ? setIsSelected(true) : setIsSelected(false); //Sets the isSelected state
    setSelectedRowId(selectionModel[0]); //Updates selectedRowId
  }, [selectionModel]);

  if (!isLoggedIn) {
    return navigate("/");
  }

  //Button functions
  const openButton = () => {};

  const modifyButton = () => {
    navigate(`/panel/tournament/${selectedRowId}`);
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

  const createButton = () => {
    navigate("/panel/tournament");
  };

  return (
    <div className="Panel">
      <div className="PageHeader">
        <h2 className="PageTitle">Your tournament</h2>
        <div className="PageButtonsWrapper">
          {/*Conditonal rendering by isSelected state*/}
          {!isSelected && (
            <Button variant="contained" onClick={createButton}>
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
