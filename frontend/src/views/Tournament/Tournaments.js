import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { get, remove } from "../../services/backend.service";
import { useSelector } from "react-redux";
import useDataGridHelper from "../../services/datagrid.service";
import useBasicServices from "../../services/basic.service";
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
  const { setLoadingState } = useBasicServices();
  const { isLoading } = useSelector((state) => state.isLoading);

  //Gets the tournaments from api
  useEffect(() => {
    async function getData() {
      const data = await get("tournaments/");
      const rows = data.map((e) => row(e));
      setRows(rows);
      setLoadingState(false);
    }
    setLoadingState(true);
    getData();
  }, []);

  if (!isLoggedIn) {
    return navigate("/");
  }

  const deleteRow = () => {
    deleteFunction(`tournaments/${selectedRowId}/`);
  };

  //Button functions
  const openButton = () => {
    navigate(`/${selectedRowId}/competitions`);
  };

  const modifyButton = () => {
    navigate("modify_tournament", { state: { rowId: selectedRowId } });
  };

  const modalProps = {
    type: "Alert",
    title: "Are you sure you want to delete this tournament?",
    subtitle: "You can not undo this action!",
    confirmButtonText: "DELETE",
    deleteRow,
  };

  return (
    <>
      {!isLoading && (
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
                  <Button variant="contained" onClick={openModalFunctiom}>
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
                <DataGrid
                  style={{ height: 300, width: "100%" }}
                  checkboxSelection={true}
                  selectionModel={selectionModel}
                  onSelectionModelChange={handleEvent}
                  rows={rows}
                  rowHeight={30}
                  columns={columns}
                />
              </div>
            </div>
          </div>
          <ModalComp modalProps={modalProps} />
        </>
      )}
    </>
  );
}
