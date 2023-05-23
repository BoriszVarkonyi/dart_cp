import React, { useState, useEffect, useRef } from "react";
import { Button, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";
import { get, post, createCancelToken } from "../../services/backend.service";
import { useNavigate } from "react-router-dom";
import useDataGridHelper from "../../services/datagrid.service";
import { useLocation } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useBasicServices from "../../services/basic.service";
import { useSelector } from "react-redux";
import { translateSex } from "../../services/translate.service";
import "../../styles/StickerPrinting.css";
import { QRCodeSVG } from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Loading from "../../components/static/Loading/Loading";

const columns = [
  {
    field: "nom",
    headerName: "First Name",
    width: 150,
    flex: 150,
    minWidth: 150,
  },
  {
    field: "pre_nom",
    headerName: "Last Name",
    width: 150,
    flex: 150,
    minWidth: 150,
  },
  { field: "nation", headerName: "Nationality", width: 100, flex: 100 },
  {
    field: "date_naissance",
    headerName: "Date of Birth",
    width: 120,
    flex: 100,
  },
  { field: "sexe", headerName: "Sex", flex: 100 },
  {
    field: "registered",
    headerName: "Status",
    type: "boolean",
    width: 180,
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
  const { isLoading } = useSelector((state) => state.isLoading);

  async function getFencersData(fCancelToken, rCancelToken) {
    const fencersData = await get(
      `competitions/${compId}/fencers/`,
      fCancelToken.token
    );
    const registrationData = await get(
      `competitions/${compId}/registrations/`,
      rCancelToken.token
    );
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
    return () => {
      //Cancels the old api call(s), if a new one is made.
      fencerCancelToken.cancel();
      regCancelToken.cancel();
    };
  }, [location]);

  function fencerInCompetition(fencers, registartions) {
    return fencers.map((f) => {
      const registrationArray = registartions.filter((r) => f.id == r.fencers);
      if (registrationArray.length == 1) {
        return {
          ...f,
          registered: registrationArray[0].registered,
          sexe: translateSex(f.sexe),
        };
      } else {
        return { ...f, registered: false, sexe: translateSex(f.sexe) };
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

  const [fencer, setFencer] = useState({});
  const [hash, setHash] = useState(undefined);

  useEffect(() => {
    if (hash !== undefined) handlePrint();
  }, [hash]);

  const cardRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => cardRef.current,
  });

  async function getFencerQRCode() {
    const f = await get(`fencers/${selectedRowId}`);
    setFencer(f);
    const hashedData = await get(`gethash/${compId}/${selectedRowId}`);
    setHash(JSON.stringify(hashedData));
  }

  function CustomToolbar() {
    return (
      <div className="GridToolbar">
        <GridToolbarQuickFilter />
      </div>
    );
  }

  

  return (
    <>
      <>
        <main>
          <div className="PageHeader">
            <h1 className="PageTitle">Registration</h1>
            <div className="PageButtonsWrapper">
              {isSelected &&
                rows.filter((f) => f.id == selectedRowId)[0]?.registered && (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        getFencerQRCode();
                      }}
                      /* onClick={() => navigate(`${selectedRowId}/print`)}*/
                    >
                      Print QR Code
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={registerOut}
                    >
                      Register out
                    </Button>
                  </>
                )}
              {isSelected &&
                !rows.filter((f) => f.id == selectedRowId)[0]?.registered && (
                  <Button variant="contained" size="small" onClick={registerIn}>
                    Register in
                  </Button>
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
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                />
              </div>
            </div>
          )}
        </main>
        <div className="PrintableSticker" ref={cardRef}>
          <div className="Sticker">
            <QRCodeSVG value={hash} size="350" />
            <div>
              <b className="StickerName">
                {fencer.nom} {fencer.pre_nom}
              </b>
              <p className="StickerNationality">
                {fencer.nation ?? fencer.club}
              </p>
            </div>
            <b className="StickerCode">{selectedRowId}</b>
            <p className="StickerWhitemark">
              Made with: <b>D'ARTGANAN CONTROL</b>
            </p>
          </div>
        </div>
      </>
    </>
  );
}
