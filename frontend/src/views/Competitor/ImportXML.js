import React, { useState } from "react";
import { Button, Alert, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { post, postBulk } from "./../../services/backend.service";
import { useParams } from "react-router-dom";
import { parseFencers } from "../../services/xml.service";
import ModalComp from "../../components/static/Modal/ModalComp";
import useDataGridHelper from "../../services/datagrid.service";
import { useDispatch } from "react-redux";
import { closeModal } from "../../slices/modalSlice";
import useBasicServices from "../../services/basic.service";
import { useSelector } from "react-redux";

const row = (element) => {
  return {
    id: element.id,
    ranking: element.points,
    fencerName: element.pre_nom + " " + element.nom,
    fencerNat: element.nation,
    fencerClub: element.club,
  };
};

//Sets the columns
const columns = [
  { field: "ranking", headerName: "RANKING", width: 100, flex: 100 },
  { field: "fencerName", headerName: "NAME", width: 220, flex: 220, minWidth: 200 },
  { field: "fencerNat", headerName: "NATIONALITY", width: 100, flex: 100 },
  { field: "fencerClub", headerName: "CLUB", width: 150, flex: 150 },
];

export default function Import() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasSelectedFile, setHasSelectedFile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const [rows, setRows] = useState([]);
  const [fencerArray, setFencerArray] = useState([]);
  const { tournamentId, compId } = useParams();
  const { openModalFunctiom } = useDataGridHelper();
  const { setLoadingState } = useBasicServices();
  const { isLoading } = useSelector((state) => state.isLoading);

  function CustomToolbar() {
    return (
      <div className="GridToolbar">
        <GridToolbarQuickFilter />
      </div>);
  }

  const modalProps = {
    type: "Success",
    title: "Success!",
    text: "Competitors have been imported successfully! \n Redirecting...",
  };

  function generateDataGrid(arrayOfFencers) {
    const rows = arrayOfFencers.map((e) => row(e));
    setRows(rows);
  }

  const selectFile = (event) => {
    setLoadingState(false);
    const fileType = event.target.files[0]?.type;
    const file = event.target.files[0];

    if (fileType == "text/xml") {
      setHasSelectedFile(true);
      setHasError(false);
      handleFile(file);
    } else {
      setHasSelectedFile(false);
      setHasError(true);
      event.target.value = null; //Deletes the uploaded file from the input
      setFencerArray([]);
    }
  };

  //Helper functions
  async function handleFile(file) {
    parseFencers(file, generateDataGrid, setFencerArray);
    setLoadingState(false);
  }

  const updateFencer = (fencer) => {
    if (fencer.club == "") {
      fencer.club = fencer.nation;
    }
    fencer.competitions = [compId];
    // dd-MM-yyyy to yyyy-MM-dd (https://www.facebook.com/groups/1084081591969203)
    fencer.date_naissance = fencer.date_naissance
      .split(".")
      .reverse()
      .join("-");
    return fencer;
  };

  const importFencers = async () => {
    const tempArray = fencerArray.map((e) => updateFencer(e));
    setFencerArray(tempArray);
    const resp = await postBulk("fencers/", tempArray);
    if (resp.name && resp.name === "AxiosError") {
      setImportStatus(false);
    } else {
      setImportStatus(true);
    }

    setLoadingState(false);
    openModalFunctiom();
    setTimeout(() => {
      dispatch(closeModal());
      navigate(-1);
    }, 3000);
  };

  return (
    <>
      {!isLoading && (
        <main className="WithAlert">
          <div className="PageHeader">
            <h1 className="PageTitle">Import XML</h1>
            <div className="PageButtonsWrapper">
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate(-1)}
              >
                Go back
              </Button>
              <Button variant="contained" component="label" size="small">
                Upload File
                <input type="file" accept=".xml" hidden onChange={selectFile} />
              </Button>
              {hasSelectedFile && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setLoadingState(true);
                    importFencers();
                  }}
                >
                  Import
                </Button>
              )}
            </div>
          </div>
          {hasError && (
            <div className="PageAlert">
              <p className="PageAlertTitle">Incompatible file format!</p>
              <p className="PageAlertSubTitle">Please select a XML file!</p>
            </div>
          )}
          {importStatus === false && (
            <div className="PageAlert">
              <p className="PageAlertTitle">A server error has occured while importing!</p>
              <p className="PageAlertSubTitle">Please try again later!</p>
            </div>
          )}
          {!hasSelectedFile && (
            <div className="PageAlert">
              <p className="PageAlertTitle">Press 'Upload File' to proceed</p>
            </div>
          )}
          {hasSelectedFile && (
            <div className="PageAlert">
              <p className="PageAlertTitle">This is only a preview!</p>
              <p className="PageAlertSubTitle">Press 'Import' to finalize!</p>
            </div>
          )}
          <div className="PageContent">
            {hasSelectedFile && (
              <div className="DataGridWrapper">
                <DataGrid
                  rows={rows}
                  rowHeight={30}
                  columns={columns}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                />
              </div>
            )}
          </div>
          <ModalComp modalProps={modalProps} />
        </main>
      )}
    </>
  );
}
