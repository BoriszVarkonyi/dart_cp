import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { get } from "../../services/backend.service";
import { useNavigate } from "react-router-dom";
import useDataGridHelper from "../../services/useDataGridHelper";
import useBasicServices from "../../services/basic.service";
import ModalComp from "../../components/static/Modal/ModalComp";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useLocation } from "react-router-dom";

//Sets the rows for DT view
const rowDT = (element) => {
  return {
    id: element.id,
    nom: element.nom,
    pre_nom: element.pre_nom,
    nation: element.nation,
    club: element.club,
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

//Sets the columns for the DT view
const columnsDT = [
  { field: "nom", headerName: "Last Name" },
  { field: "pre_nom", headerName: "First Name" },
  { field: "nation", headerName: "Nationality" },
  { field: "club", headerName: "Club" },
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
  const [rowDTView, setRowDTView] = useState([])
  const [allDataView, setAllDataView] = useState(true)
  const navigate = useNavigate();
  const { tourId, compId } = useParams();
  const location = useLocation();
  const basicServices = useBasicServices();

  async function getFencersData() {
    const data = await get(`competitions/${compId}/fencers/`);
    //Sets the datas for the All Data view
    setRows(data);

    //Sets the datas for the DT view
    const rowArray = data.map((e) => rowDT(e))
    setRowDTView(rowArray)

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
            <Button variant="contained" size="small" onClick={() => setAllDataView(true)}>All data</Button>
            <Button variant="contained" size="small" onClick={() => setAllDataView(false)}>DT</Button>
          </div>
          <div className="TableGrid">
            reg status:
            <Chip icon={<CheckCircleOutlineIcon />} label="Done" variant="outlined" />
            <Chip icon={<HighlightOffIcon />} label="Not done" variant="outlined" />
            wc status:
            <Chip icon={<CheckCircleOutlineIcon />} label="Finished" variant="outlined" />
            <Chip icon={<HighlightOffIcon />} label="Not finished" variant="outlined" />
            <DataGrid
              style={{ height: "100%", width: "100%" }}
              checkboxSelection={true}
              selectionModel={selectionModel}
              onSelectionModelChange={handleEvent}
              rows={allDataView ? rows : rowDTView}
              rowHeight={25}
              columns={allDataView ? columns : columnsDT}
            />
          </div>
        </div>
      </div>
      <ModalComp modalProps={modalProps} />
    </>
  );
}
