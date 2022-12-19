import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { get, remove } from "../../services/backend.service";
import { useSelector } from "react-redux";

const row = (element) => {
  return {
    id: element.id,
    tournamentName: element.title_long,
    startingDate: element.starting_date,
    endingDate: element.ending_date,
  };
}

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

  useEffect(() => {
    async function getData() {
      const data = await get("tournaments/");
      const rows = data.map((e,i) => row(e,i));
      setRows(rows);
    }
    getData();
  }, []);

  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  const handleRowData = (params) => {
    console.log(params);
    return setSelectedRowId(params.id);
  };

  //Button functions
  const openButton = () => {
    console.log(selectedRowId);
  };

  const modifyButton = () => {
    navigate("/panel/tournament")
  };

  const deleteButton = async () => {
    await remove(`tournaments/${selectedRowId}/`);
    window.location.reload();
  };

  const createButton = () => {
    navigate("/panel/tournament")
  };

  //When a row is selected it handles the selected state
  const handleEvent = (params) => {
    params.length == 1 ? setIsSelected(true) : setIsSelected(false);
  };

  return (
    <div className="Panel">
      <div className="PageHeader">
        <h2 className="PageTitle">Your tournament</h2>
        <div className="PageButtonsWrapper">
          {/*Conditonal rendering by isSelected state*/}
          {!isSelected && <Button variant="contained" onClick={createButton}> Create </Button>}
          {isSelected && <Button variant="contained" onClick={deleteButton}> Delete </Button>}
          {isSelected && <Button variant="contained" onClick={modifyButton}> Modify </Button>}
          {isSelected && <Button variant="contained" onClick={openButton}> Open </Button>}
        </div>
      </div>
      <div className="PanelContentSingle">
        <div className="TableGrid">
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              checkboxSelection={true}
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
