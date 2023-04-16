import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="Panel">
      <div className="PageHeader">
        <p className="PageTitle">Ooops! Not found.</p>
      </div>
      <div className="PageContent">
        <p>
          Page is not found. Maybe the url is wrong. Check tournament and
          competition id.
        </p>
        <Button variant="contained" onClick={() => navigate("/")}>Back to login</Button>
      </div>
    </div>
  );
}
