import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useDataGridHelper from "../../services/useDataGridHelper";
import { useParams } from "react-router-dom";
import { get, remove } from "../../services/backend.service";
import ModalComp from "../../components/static/Modal/ModalComp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useLocation } from "react-router-dom";
import useBasicServices from "../../services/basic.service";

const row = (element) => {
  return {
    id: element.id,
    barCode: element.barcode,
    wcName: element.pre_nom + " " + element.nom,
    wcNat: element.nation,
    wcClub: element.club,
    wcDTB: element.date_naissance,
    wcSex: element.sexe,
    wcStatus: element.wc_status,
    statut: element.statut,
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
  { field: "wcStatus", headerName: "WC. STATUS", width: 200 },
  { field: "statut", headerName: "STATUS", width: 200 },
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
  const { tourId, compId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoadingState } = useBasicServices();

  async function getFencersData() {
    const data = await get(`competitorsdata/${compId}`);
    const rows = data.map((e) => row(e));
    setRows(rows);
    setLoadingState(false);
  }

  //Gets the data from api. Also updates the data on route change. For example when another comp is selected.
  useEffect(() => {
    setLoadingState(true);
    getFencersData();
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
    setIsSelected(false);
    setSelectionModel([]);
  };

  const deleteWc = () => {
    setModalProps({
      type: "Alert",
      title:
        "Are you sure you want to delete this competitiors weapon control?",
      subtitle: "You can not undo this action!",
      confirmButtonText: "DELETE",
      deleteRow,
    });
    openModalFunctiom();
  };

  const openBarcode = () => {
    setModalProps({
      type: "Barcode",
      title: "Read barcode",
      subtitle: undefined,
    });
    openModalFunctiom();
  };

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Weapon Control</h2>
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
            <Button variant="contained" size="small">
              STATISTICS
            </Button>
          )}
          {!isSelected && (
            <Button variant="contained" size="small" onClick={openBarcode}>
              Read Barcode
            </Button>
          )}
        </div>
      </div>
      <div className="PageContent">
        <div className="TableGrid">
          wc status:
          <Chip
            icon={<CheckCircleOutlineIcon />}
            label="Finished"
            variant="outlined"
          />
          <Chip
            icon={<HighlightOffIcon />}
            label="Not finished"
            variant="outlined"
          />
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
      <ModalComp modalProps={modalProps} />
    </div>
  );
}
