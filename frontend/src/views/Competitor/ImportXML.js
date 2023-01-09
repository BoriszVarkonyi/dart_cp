import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { post, postBulk } from "./../../services/backend.service";
import { useParams } from "react-router-dom";

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
  { field: "ranking", headerName: "RANKING", width: 200 },
  { field: "fencerName", headerName: "NAME", width: 200 },
  { field: "fencerNat", headerName: "NATIONALITY", width: 200 },
  { field: "fencerClub", headerName: "CLUB", width: 200 },
];

export default function Import() {
  const navigate = useNavigate();
  const [hasSelectedFile, setHasSelectedFile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);
  const [fencerArray, setFencerArray] = useState([]);
  const { tournamentId, compId } = useParams();

  function generateDataGrid(arrayOfFencers) {
    const rows = arrayOfFencers.map((e) => row(e));
    setRows(rows);
  }

  const selectFile = (event) => {
    const fileType = event.target.files[0].type;
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
    const formData = new FormData();
    formData.append("test", file);

    fetch("http://localhost:8082/api/uploadxml/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        generateDataGrid(data);
        setFencerArray(data);
      });
  }

  const updateFencer = (fencer) => {
    if (fencer.club == "") {
      fencer.club = fencer.nation;
    }
    fencer.competitions = [compId];
    // dd-MM-yyyy to yyyy-MM-dd (https://www.facebook.com/groups/1084081591969203)
    fencer.date_naissance = fencer.date_naissance.split('.').reverse().join('-');
    return fencer;
  }

  const importFencers = async () => {
    const tempArray = fencerArray.map((e) => updateFencer(e))
    console.log(tempArray);
    setFencerArray(tempArray);
    await postBulk("fencers/", tempArray);
  };

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Import XML</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" size="small" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button variant="contained" component="label" size="small">
            Upload File
            <input type="file" hidden onChange={selectFile} />
          </Button>
          {hasError && <p>Wrong file format!</p>}
          {hasSelectedFile && (
            <Button variant="contained" size="small" onClick={importFencers}>
              Import
            </Button>
          )}
        </div>
      </div>
      <div className="PageContent">
        <div className="TableGrid">
          {!hasSelectedFile && (
            <>
              <h2>File not selected</h2>
            </>
          )}
          {hasSelectedFile && (
            <>
              <h3>Preview:</h3>
              <div style={{ height: 600, width: "100%" }}>
                <DataGrid rows={rows} columns={columns} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
