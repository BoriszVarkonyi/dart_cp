import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { get, post, createCancelToken } from "../../services/backend.service";
import { useNavigate } from "react-router-dom";
import useDataGridHelper from "../../services/useDataGridHelper";
import { useLocation } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useBasicServices from "../../services/basic.service";
import { useSelector } from "react-redux";
import Loading from "../../components/static/Loading/Loading";

const columns = [
  { field: "nom", headerName: "First Name" },
  { field: "pre_nom", headerName: "Last Name" },
  { field: "nation", headerName: "Nationality" },
  { field: "date_naissance", headerName: "Date of Birth" },
  { field: "sexe", headerName: "Sex" },
  {
    field: "registered",
    headerName: "Status",
    type: "boolean",
    renderCell: (params) => {
      return params.value ? (
        <Chip
          icon={<CheckCircleOutlineIcon />}
          label="Done"
          variant="outlined"
        />
      ) : (
        <Chip icon={<HighlightOffIcon />} label="Not done" variant="outlined" />
      );
    },
  },
];

export default function Registration() {
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
  const location = useLocation();
  const { tourId, compId } = useParams();
  const { setLoadingState } = useBasicServices();

  async function getFencersData(fCancelToken, rCancelToken) {
    const fencersData = await get(`competitions/${compId}/fencers/`, fCancelToken.token);
    const registrationData = await get(`competitions/${compId}/registrations/`, rCancelToken.token);
    setRows(fencerInCompetition(fencersData, registrationData));
  }

  // Gets the data from api. Updates the data on route change.
  // For example when another comp is selected.
  useEffect(() => {
    setLoadingState(true);
    //Creates cancel token(s). It prevents the user to spam api calls.
    const fencerCancelToken = createCancelToken();
    const regCancelToken = createCancelToken();
    getFencersData(fencerCancelToken, regCancelToken);
    return()=>{
      //Cancels the old api call(s), if a new one is made.
      fencerCancelToken.cancel();
      regCancelToken.cancel()
    }
  }, [location]);

  function fencerInCompetition(fencers, registartions) {
    return fencers.map((f) => {
      const registrationArray = registartions.filter((r) => f.id == r.fencers);
      if (registrationArray.length == 1) {
        return { ...f, registered: registrationArray[0].registered };
      } else {
        return { ...f, registered: false };
      }
    });
  }

  function updateRows() {
    setRows((prevRows) => {
      return prevRows.map((f) =>
        f.id == selectedRowId ? { ...f, registered: !f.registered } : f
      );
    });
  }

  async function registerIn() {
    if (isSelected) {
      const selectedFencer = rows.filter((f) => f.id == selectedRowId)[0];
      selectedFencer.competitions = [
        ...selectedFencer.competitions,
        parseInt(compId),
      ];
      await post(`in-register/${compId}/${selectedRowId}/`);
      updateRows();
    }
  }

  async function registerOut() {
    if (isSelected) {
      const selectedFencer = rows.filter((f) => f.id == selectedRowId)[0];
      selectedFencer.competitions = selectedFencer.competitions.filter(
        (c) => c != parseInt(compId)
      );
      await post(`un-register/${compId}/${selectedRowId}/`);
      updateRows();
    }
  }

  const modalContent = {};

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Registration</h2>
        <div className="PageButtonsWrapper">
          {isSelected &&
            rows.filter((f) => f.id == selectedRowId)[0].registered && (
              <>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`${selectedRowId}/print`)}
                >
                  Print Code
                </Button>
                <Button variant="contained" size="small" onClick={registerOut}>
                  Register out
                </Button>
              </>
            )}
          {isSelected &&
            !rows.filter((f) => f.id == selectedRowId)[0].registered && (
              <Button variant="contained" size="small" onClick={registerIn}>
                Register in
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
  );
}
