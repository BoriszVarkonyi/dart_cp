import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useDataGridHelper from "../../services/useDataGridHelper";
import { useParams } from "react-router-dom";
import { get } from "../../services/backend.service";
import ModalComp from "../../components/static/Modal/ModalComp";

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


  //Gets the competitors from api
  useEffect(() => {
    async function getFencersData() {
      const data = await get(`competitions/${compId}/fencers/`);
      const rows = data.map((e) => row(e));
      setRows(rows);
    }
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
            <Button variant="contained" size="small" onClick={() => navigate("modify")}>
              Modify weapon control
            </Button>
          )}
          {isSelected && (
            <Button variant="contained" size="small" onClick={() => navigate("add")}>
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
      <ModalComp type="Barcode" modalProps={modalProps}/>
    </div>
  );
}
