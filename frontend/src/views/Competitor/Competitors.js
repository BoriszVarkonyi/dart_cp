import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Chip } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { get, createCancelToken } from "../../services/backend.service";
import { useNavigate } from "react-router-dom";
import useDataGridHelper from "../../services/datagrid.service";
import useBasicServices from "../../services/basic.service";
import ModalComp from "../../components/static/Modal/ModalComp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useLocation } from "react-router-dom";
import Loading from "../../components/static/Loading/Loading";
import { useSelector } from "react-redux";

import {
  translateLateralite,
  translateSex,
  translateStatus,
} from "../../services/translate.service";

//Sets the rows for DT view
const rowDT = (element) => {
  return {
    id: element.id,
    nom: element.nom,
    pre_nom: element.pre_nom,
    nation: element.nation,
    club: element.club,
    statut: element.statut,
    reg_status: element.reg_status,
    wc_status: element.wc_status,
  };
};

const columns = [
  { field: "classement", headerName: "Ranking", width: 80 },
  { field: "points", headerName: "Points", width: 80 },
  {
    field: "pre_nom",
    headerName: "First Name",
    width: 150,
    flex: 150,
    minWidth: 150,
  },
  {
    field: "nom",
    headerName: "Last Name",
    width: 150,
    flex: 150,
    minWidth: 150,
  },
  { field: "nation", headerName: "Nationality", width: 100 },
  { field: "club", headerName: "Club", width: 150 },
  { field: "date_naissance", headerName: "Date of Birth", width: 120 },
  { field: "sexe", headerName: "Sex", width: 100 },
  { field: "lateralite", headerName: "Lateralite", width: 100 },
  { field: "licence", headerName: "Licence", width: 150 },
  { field: "statut", headerName: "Statut", width: 100 },
  {
    field: "reg_status",
    headerName: "Registartion",
    type: "boolean",
    width: 170,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return params.value ? (
        <div className="Chip Green">
          <CheckCircleOutlineIcon />
          <p>Done</p>
        </div>
      ) : (
        <div className="Chip Red">
          <HighlightOffIcon />
          <p>Not done</p>
        </div>
      );
    },
  },
  {
    field: "wc_status",
    headerName: "Weapon Control",
    type: "boolean",
    width: 170,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return params.value ? (
        <div className="Chip Green">
          <CheckCircleOutlineIcon />
          <p>Finished</p>
        </div>
      ) : (
        <div className="Chip Red">
          <HighlightOffIcon />
          <p>Not finished</p>
        </div>
      );
    },
  },
];

//Sets the columns for the DT view
const columnsDT = [
  {
    field: "pre_nom",
    headerName: "First Name",
    width: 150,
    flex: 150,
    minWidth: 150,
  },
  {
    field: "nom",
    headerName: "Last Name",
    width: 150,
    flex: 150,
    minWidth: 150,
  },
  { field: "nation", headerName: "Nationality", width: 100 },
  { field: "club", headerName: "Club", width: 150 },
  {
    field: "reg_status",
    headerName: "Registartion",
    type: "boolean",
    width: 170,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return params.value ? (
        <div className="Chip Green">
          <CheckCircleOutlineIcon />
          <p>Done</p>
        </div>
      ) : (
        <div className="Chip Red">
          <HighlightOffIcon />
          <p>Not done</p>
        </div>
      );
    },
  },
  {
    field: "wc_status",
    headerName: "Weapon Control",
    type: "boolean",
    width: 170,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return params.value ? (
        <div className="Chip Green">
          <CheckCircleOutlineIcon />
          <p>Finished</p>
        </div>
      ) : (
        <div className="Chip Red">
          <HighlightOffIcon />
          <p>Not finished</p>
        </div>
      );
    },
  },
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
  const [rowDTView, setRowDTView] = useState([]);
  const [allDataView, setAllDataView] = useState(true);
  const navigate = useNavigate();
  const { tourId, compId } = useParams();
  const location = useLocation();
  const { setLoadingState } = useBasicServices();
  const { isLoading } = useSelector((state) => state.isLoading);

  async function getFencersData(cancelToken) {
    const data = await get(`competitorsdata/${compId}`, cancelToken.token);

    //Sets the datas for the All Data view
    setRows(
      data.map((f) => {
        return {
          ...f,
          sexe: translateSex(f.sexe),
          lateralite: translateLateralite(f.lateralite),
          statut: translateStatus(f.statut),
        };
      })
    );

    //Sets the datas for the DT view
    let rowArray = data.map((e) => rowDT(e));
    setRowDTView(rowArray);

  }

  //Gets the competitors from api. Also updates the data on route change. For example when another comp is selected.
  useEffect(() => {
    //Sets the Loading state to true. Loading state is stored in a Redux store.
    setLoadingState(true);

    //Creates cancel token(s). It prevents the user to spam api calls.
    const cancelToken = createCancelToken();
    getFencersData(cancelToken);


    //Cancels the old api call(s), if a new one is made.
    return () => cancelToken.cancel();
  }, [location]);

  const deleteRow = () => {
    deleteFunction(`fencers/${selectedRowId}/`, {
      compID: compId,
      fencerID: selectedRowId,
    });
  };

  function CustomToolbar() {
    return (
      <div className="GridToolbar">
        <div className="DataGridColumnOptions">
          <p>Show columns:</p>
          <Button
            variant="contained"
            size="small"
            onClick={() => setAllDataView(true)}
          >
            ALL
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setAllDataView(false)}
          >
            DT ONLY
          </Button>
        </div>
        <GridToolbarQuickFilter />
      </div>
    );
  }

  const modalProps = {
    type: "Alert",
    title: "Are you sure you want to delete this competitor?",
    subtitle: "You can not undo this action!",
    confirmButtonText: "DELETE",
    deleteRow,
  };

  return (
    <>
      <main>
        <div className="PageHeader">
          <h1 className="PageTitle">Competitors</h1>
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
                Add
              </Button>
            )}
          </div>
        </div>
        {isLoading && <Loading/>}
        {!isLoading && (
          <div className="PageContent">
            <div className="DataGridWrapper">
              <DataGrid
                checkboxSelection={true}
                selectionModel={selectionModel}
                onSelectionModelChange={handleEvent}
                rows={allDataView ? rows : rowDTView}
                rowHeight={30}
                columns={allDataView ? columns : columnsDT}
                components={{
                  Toolbar: CustomToolbar,
                }}
              />
            </div>
          </div>
        )}
      </main>
      <ModalComp modalProps={modalProps} />
    </>
  );
}
