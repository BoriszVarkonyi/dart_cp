import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useDataGridHelper from "../../services/useDataGridHelper";
import { useParams } from "react-router-dom";
import { get } from "../../services/backend.service";
import ModalComp from "../../components/static/Modal/ModalComp";
import { useLocation } from "react-router-dom";

const row = (element) => {
  return {
    id: element.id,
    barCode: element.barcode,
    wcName: element.pre_nom + " " + element.nom,
    wcNat: element.nation,
    wcClub: element.club,
    wcDTB: element.date_naissance,
    wcSex: element.sexe,
    wcStatus: element.statut,
  };
};

//Sets the columns
const columns = [
  { field: "barCode", headerName: "BARCODE", width: 200 },
  { field: "wcName", headerName: "NAME", width: 200 },
  { field: "wcNat", headerName: "NATIONALITY", width: 200 },
  { field: "wcClub", headerName: "CLUB", width: 200 },
  { field: "wcDTB", headerName: "DATE OF BIRTH", width: 200 },
  { field: "wcSex", headerName: "SEX", width: 200 },
  { field: "wcStatus", headerName: "STATUS", width: 200 },
];

export default function WeaponControls() {
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
  const { tourId, compId } = useParams();
  const navigate = useNavigate()
  const location = useLocation();

  async function getFencersData() {
    const data = await get(`competitions/${compId}/fencers/`);
    const rows = data.map((e) => row(e));
    setRows(rows);
  }

//Updates the data on route change. For example when another comp is selected.
  useEffect(() => {
    getFencersData();
  }, [location]);

  //Gets the competitors from api
  useEffect(() => {
    getFencersData();
  }, []);

  const modalProps = {
    title: "Read barcode",
    subtitle: undefined
  }

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Weapon Control</h2>
        <div className="PageButtonsWrapper">
          {isSelected && (
            <Button variant="contained" size="small">
              Remove weapon control
            </Button>
          )}
          {isSelected && (
            <Button variant="contained" size="small" onClick={() => navigate("modify", { state: { rowId: selectedRowId } })}>
              Modify weapon control
            </Button>
          )}
          {isSelected && (
            <Button variant="contained" size="small" onClick={() => navigate("add", { state: { rowId: selectedRowId } })}>
              Add weapon control
            </Button>
          )}
          <Button variant="contained" size="small" onClick={openModalFunctiom}>
            Read Barcode
          </Button>
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
      <ModalComp type="Barcode" modalProps={modalProps} />
    </div>
  );
}
