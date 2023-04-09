import React from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, remove } from "../../services/backend.service";
import { useParams } from "react-router-dom";
import useDataGridHelper from "../../services/useDataGridHelper";
import ModalComp from "../../components/static/Modal/ModalComp";
import { setCompetitions, deleteCompetition } from "../../slices/compSlice";
import { useDispatch } from "react-redux";
import useBasicServices from "../../services/basic.service"

const row = (element) => {
  return {
    id: element.id,
    name: element.title_long,
    weapon_type: element.weapon_type,
    is_wheelchair: element.is_wheelchair,
    sex: element.sex,
    type: element.type,
    age_group: element.age_group,
  };
};

const columns = [
  { field: "name", headerName: "NAME", width: 200 },
  { field: "weapon_type", headerName: "WEAPON TYPE", width: 200 },
  { field: "is_wheelchair", headerName: "IS WHEELCHAIR", width: 200 },
  { field: "sex", headerName: "SEX", width: 200 },
  { field: "type", headerName: "TYPE", width: 200 },
  { field: "age_group", headerName: "AGE GROUP", width: 200 },
];

export default function Competitions() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { setLoadingState } = useBasicServices();
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
  const { tournamentId } = useParams();

  async function getData() {
    const data = await get(`tournaments/${tournamentId}/competitions/`);
    const rows = data.map((e) => row(e));
    setRows(rows);

    //Navbar menuitems works from a redux store state. This sets that state
    dispatch(setCompetitions(data))
    setLoadingState(false)
  }

  useEffect(() => {
    setLoadingState(true)
    getData();
  }, []);


  const deleteRow = () => {
    deleteFunction(`competitions/${selectedRowId}/`);

    //Navbar menuitems works from a redux store state. This deletes the comp from that state.
    dispatch(deleteCompetition(selectedRowId))
  };

  const modalProps = {
    type: "Alert",
    title: "Are you sure you want to delete this competition?",
    subtitle: "You can not undo this action!",
    confirmButtonText: "DELETE",
    deleteRow
  }


  return (
    <>
      <div className="Main">
        <div className="PageHeader">
          <h2 className="PageTitle">Competitions</h2>
          <div className="PageButtonsWrapper">
            {isSelected && (
              <Button
                variant="contained"
                size="small"
                onClick={openModalFunctiom}
              >
                Delete
              </Button>
            )}
            {isSelected && (
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  navigate("modify", { state: { rowId: selectedRowId } })
                }
              >
                Modify
              </Button>
            )}
            {!isSelected && (
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  navigate("create", { state: { rowId: selectedRowId } })
                }
              >
                Create
              </Button>
            )}
          </div>
        </div>
        <div className="PageContent">
          <div className="TableGrid">
            <DataGrid
              style={{ height: "100%", width: "100%" }}
              checkboxSelection={true}
              selectionModel={selectionModel}
              onSelectionModelChange={handleEvent}
              rows={rows}
              columns={columns}
            />
          </div>
        </div>
      </div>
      <ModalComp modalProps={modalProps} />
    </>
  );
}
