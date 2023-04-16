import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div id="NotFoundWrapper">
      <div id="NotFoundHeader">
        <p id="NotFoundTitle">Ooops! Page not found.</p>
      </div>
      <div id="NotFoundContent">
        <p>Page is not found. The URL might be incorrect. Check tournament and competition ID.</p>
        <Button variant="contained" onClick={() => navigate(-1)}>Go back</Button>
      </div>
    </div>
  );
}
