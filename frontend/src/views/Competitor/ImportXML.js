import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postXML } from "../../services/backend.service";


export default function Import() {
  const navigate = useNavigate();
  const [hasSelectedFile, setHasSelectedFile] = useState(false);
  const [hasError, setHasError] = useState(false);

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
    }
  };

  const onSubmit = (data) => {};

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Import XML</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" size="small" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <label htmlFor="file_upload">
            <input
              id="file_upload"
              name="file_upload"
              style={{ display: "none" }}
              type="file"
              onChange={selectFile}
            />
            <Button variant="contained" size="small" component="span">
              Choose Files
            </Button>
            {hasError && <p>Wrong file format!</p>}
          </label>
          {hasSelectedFile && (
            <Button variant="contained" size="small">
              Import
            </Button>
          )}
        </div>
      </div>
      <div className="PanelContentSingle">
        <div className="TableGrid">
          {!hasSelectedFile && (
            <>
              <h2>File not selected</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

async function handleFile(file) {
  // const formData = new FormData();
  // formData.append('test', file);

  // const response = await postXML("uploadxml/", formData);
  // console.log(response)
}
