import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { get } from "../../services/backend.service";
import { useNavigate } from "react-router-dom";
import useDataGridHelper from "../../services/useDataGridHelper";
import useBasicServices from "../../services/basic.service";
import ModalComp from "../../components/static/Modal/ModalComp";
import { useLocation } from "react-router-dom";

const row = (element) => {
  return {
    id: element.id,
    classement: element.classement,
    points: element.points,
    nom: element.nom,
    pre_nom: element.pre_nom,
    nation: element.nation,
    club: element.club,
    date_naissance: element.date_naissance,
    sexe: element.sexe,
    lateralite: element.lateralite,
    licence: element.licence,
    reg_status: element.reg_status,
    wc_status: element.wc_status,
  };
};

const columns = [
  { field: "classement", headerName: "Ranking" },
  { field: "points", headerName: "Points" },
  { field: "nom", headerName: "Last Name" },
  { field: "pre_nom", headerName: "First Name" },
  { field: "nation", headerName: "Nationality" },
  { field: "club", headerName: "Club" },
  { field: "date_naissance", headerName: "Date of Birth" },
  { field: "sexe", headerName: "Sex" },
  { field: "lateralite", headerName: "Lateralite" },
  { field: "licence", headerName: "Licence" },
  { field: "reg_status", headerName: "Reg. Status" },
  { field: "wc_status", headerName: "Wc. Status" },
];

export default function Competitors() {
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
  const navigate = useNavigate();
  const { tourId, compId } = useParams();
  const location = useLocation();
  const basicServices = useBasicServices();

  async function getFencersData() {
    const data = await get(`competitions/${compId}/fencers/`);
    setRows(data);
  }

  //Gets the competitors from api. Also updates the data on route change. For example when another comp is selected.
  useEffect(() => {
    getFencersData();
  }, [location]);

  const deleteRow = () => {
    deleteFunction(`fencers/${selectedRowId}/`);
  };

  const modalProps = {
    type: "Alert",
    title: "Are you sure you want to delete this competitior?",
    subtitle: "You can not undo this action!",
    confirmButtonText: "DELETE",
    deleteRow,
  };

  return (
    <>
      <div className="Main">
        <div className="PageHeader">
          <h2 className="PageTitle">Competitors</h2>
          <div className="PageButtonsWrapper">
            {!isSelected && (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("importXML")}
              >
                Import XML
              </Button>
            )}
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
                  navigate("add", { state: { rowId: selectedRowId } })
                }
              >
                Create
              </Button>
            )}
          </div>
        </div>
        <div className="PageContent WithButtons">
          <div className="TableGridColumnOptions">
            <Button variant="contained" size="small">All data</Button>
            <Button variant="contained" size="small">DT</Button>
          </div>
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
