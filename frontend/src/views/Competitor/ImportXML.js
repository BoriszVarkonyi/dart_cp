import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Import() {
  const navigate = useNavigate();
  const [hasSelectedFile, setHasSelectedFile] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {};

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Import XML</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" size="small" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button variant="contained" size="small">
            Select file
          </Button>
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
