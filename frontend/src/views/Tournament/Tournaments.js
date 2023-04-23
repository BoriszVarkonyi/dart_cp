import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
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
  { field: "tournamentName", headerName: "Name", width: 200, flex: 150 },
  { field: "startingDate", headerName: "Starting Date", width: 150, flex: 100 },
  { field: "endingDate", headerName: "Ending Date", flex: 100 },
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

  function CustomToolbar() {
    return (
      <div className="GridToolbar">
        <GridToolbarQuickFilter />
      </div>);
  }

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
              <h1 className="PageTitle">Your tournament</h1>
              <div className="PageButtonsWrapper">
                {/*Conditonal rendering by isSelected state*/}
                {!isSelected && (
                  <Button
                    variant="contained"
                    size="small"
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
                  <Button variant="contained" size="small" onClick={openModalFunctiom}>
                    Delete
                  </Button>
                )}
                {isSelected && (
                  <Button variant="contained" size="small" onClick={modifyButton}>
                    Modify
                  </Button>
                )}
                {isSelected && (
                  <Button variant="contained" size="small" onClick={openButton}>
                    Open
                  </Button>
                )}
              </div>
            </div>
            <div>
              <div className="DataGridWrapper">
                <DataGrid
                  checkboxSelection={true}
                  selectionModel={selectionModel}
                  onSelectionModelChange={handleEvent}
                  rows={rows}
                  rowHeight={30}
                  columns={columns}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
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
