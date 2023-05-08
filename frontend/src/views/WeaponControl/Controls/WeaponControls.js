import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useDataGridHelper from "../../../services/datagrid.service";
import { useParams } from "react-router-dom";
import {
  get,
  remove,
  createCancelToken,
} from "../../../services/backend.service";
import ModalComp from "../../../components/static/Modal/ModalComp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useLocation, redirect } from "react-router-dom";
import useBasicServices from "../../../services/basic.service";
import { translateSex } from "../../../services/translate.service";
import { useSelector } from "react-redux";
import Loading from "../../../components/static/Loading/Loading";

const row = (element) => {
  return {
    id: element.id,
    wcName: element.pre_nom + " " + element.nom,
    wcNat: element.nation,
    wcClub: element.club,
    wcStatus: element.wc_status,
  };
};

//Sets the columns
const columns = [
  { field: "wcName", headerName: "NAME", width: 220, flex: 220, minWidth: 200 },
  { field: "wcNat", headerName: "NATIONALITY", width: 100, flex: 120 },
  { field: "wcClub", headerName: "CLUB", width: 150, flex: 150 },
  {
    field: "wcStatus",
    headerName: "Status",
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

export default function WeaponControls() {
  const {
    selectionModel,
    selectedRowId,
    isSelected,
    rows,
    setRows,
    setIsSelected,
    setSelectionModel,
    handleEvent,
    openModalFunctiom,
  } = useDataGridHelper();
  const [modalProps, setModalProps] = useState({});
  const [hasWC, setHasWC] = useState(false);
  const { tournamentId, compId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoadingState } = useBasicServices();
  const { isLoading } = useSelector((state) => state.isLoading);

  async function getFencersData(cancelToken) {
    const data = await get(`competitorsdata/${compId}`, cancelToken.token);
    const rows = data.map((e) => row(e));
    setRows(rows);
  }

  //Gets the data from api. Also updates the data on route change. For example when another comp is selected.
  useEffect(() => {
    //Sets the Loading state to true. Loading state is stored in a Redux store.
    setLoadingState(true);
    //Creates cancel token(s). It prevents the user to spam api calls.
    const cancelToken = createCancelToken();
    getFencersData(cancelToken);
    return () => cancelToken.cancel();
  }, [location]);

  //Determindes if a competition has already wc.
  useEffect(() => {
    if (selectedRowId != undefined) {
      let selectedRow = rows.filter((row) => row.id.includes(selectedRowId));
      selectedRow[0].wcStatus ? setHasWC(true) : setHasWC(false);
    } else {
      setHasWC(false);
    }
  }, [selectedRowId]);

  const deleteRow = async () => {
    await remove(`stats/weaponcontrols/issues/${compId}/${selectedRowId}/`);
    const rowIndex = rows.findIndex((row) => row.id == selectedRowId);
    rows[rowIndex].wcStatus = false;
    setIsSelected(false);
    setSelectionModel([]);
  };

  const deleteWc = () => {
    setModalProps({
      type: "Alert",
      title: "Are you sure you want to delete this competitors weapon control?",
      subtitle: "You can not undo this action!",
      confirmButtonText: "DELETE",
      deleteRow,
    });
    openModalFunctiom();
  };

  function CustomToolbar() {
    return (
      <div className="GridToolbar">
        <GridToolbarQuickFilter />
      </div>
    );
  }

  const openQRCode = () => {
    setModalProps({
      type: "Barcode",
      title: "Read barcode",
      subtitle: undefined,
    });
    openModalFunctiom();
  };

  return (
    <>
      <main>
        <div className="PageHeader">
          <h1 className="PageTitle">Weapon Control</h1>
          <div className="PageButtonsWrapper">
            {isSelected && hasWC && (
              <Button variant="contained" size="small" onClick={deleteWc}>
                Remove weapon control
              </Button>
            )}
            {isSelected && hasWC && (
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  navigate("modify", { state: { rowId: selectedRowId } })
                }
              >
                Modify weapon control
              </Button>
            )}
            {isSelected && !hasWC && (
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  navigate("add", { state: { rowId: selectedRowId } })
                }
              >
                Add weapon control
              </Button>
            )}
            {!isSelected && (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("statistics")}
              >
                STATISTICS
              </Button>
            )}
            {!isSelected && (
              <Button variant="contained" size="small" onClick={openQRCode}>
                Read QR Code
              </Button>
            )}
            {!isSelected && (
                <Link
                  to={`/${tournamentId}/wepon_control/report`}
                  target="_blank"
                >
                  {" "}
                  Show reports
                </Link>
            )}
          </div>
        </div>
        {isLoading && <Loading />}
        {!isLoading && (
          <div className="PageContent">
            <div className="DataGridWrapper">
              <DataGrid
                checkboxSelection={true}
                selectionModel={selectionModel}
                onSelectionModelChange={handleEvent}
                rows={rows}
                rowHeight={30}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 300 } },
                }}
                pageSizeOptions={[300, 400]}
                components={{
                  Toolbar: CustomToolbar,
                }}
              />
            </div>
          </div>
        )}
        <ModalComp modalProps={modalProps} />
      </main>
    </>
  );
}
