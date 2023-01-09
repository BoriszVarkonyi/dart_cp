import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { get, remove } from "../../services/backend.service";
import { useSelector } from "react-redux";
import useDataGridHelper from "../../services/useDataGridHelper";
import ModalComp from "../../components/static/Modal/ModalComp";

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
  const {
    selectionModel,
    selectedRowId,
    isSelected,
    rows,
    setRows,
    handleEvent,
    deleteFunction,
    openModalFunctiom,
  } = useDataGridHelper();
  const { isLoggedIn } = useSelector((state) => state.auth);

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

  // if (!isLoggedIn) {
  //   return navigate("/");
  // }

  const deleteRow = () => {
    deleteFunction(`tournaments/${selectedRowId}/`);
  };

  //Button functions
  const openButton = () => {
    navigate(`/${selectedRowId}`);
  };

  const modifyButton = () => {
    navigate("modify_tournament", { state: { rowId: selectedRowId } });
  };

  return (
    <>
      <div className="Panel">
        <div className="PageHeader">
          <h2 className="PageTitle">Your tournament</h2>
          <div className="PageButtonsWrapper">
            {/*Conditonal rendering by isSelected state*/}
            {!isSelected && (
              <Button
                variant="contained"
                onClick={() =>
                  navigate("create_tournament", {
                    state: { rowId: selectedRowId },
                  })
                }
              >
                Create
              </Button>
            )}
            {isSelected && (
              <Button
                variant="contained"
                onClick={openModalFunctiom}
              >
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
        <div className="PageContent">
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
      <ModalComp title="Are you sure?" text="Are you sure you want to delete this tournament?" confirmButtonText="DELETE" actionOnConfirm={deleteRow} />}
    </>
  );
}
