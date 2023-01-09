import React from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, remove } from "../../services/backend.service";
import { useParams } from "react-router-dom";
import useDataGridHelper from "../../services/useDataGridHelper";
import ModalComp from "../../components/static/Modal/ModalComp";

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
  const {
    selectionModel,
    selectedRowId,
    isSelected,
    rows,
    setRows,
    handleEvent,
    deleteFunction,
    openModalFunctiom
  } = useDataGridHelper();
  const { tournamentId } = useParams();

  useEffect(() => {
    async function getData() {
      const data = await get(`tournaments/${tournamentId}/competitions/`);
      const rows = data.map((e) => row(e));
      setRows(rows);
    }
    getData();
  }, []);

  const deleteRow = () => {
    deleteFunction(`competitions/${selectedRowId}/`)
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
                onClick={openModalFunctiom}
              >
                Delete
              </Button>
            )}
            {isSelected && (
              <Button
                variant="contained"
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
            <div style={{ height: 300, width: "100%", bgcolor: "#fff" }}>
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
      <ModalComp title="Are you sure?" text="Are you sure you want to delete this competition?" confirmButtonText="DELETE" actionOnConfirm={deleteRow} />
    </>
  );
}
