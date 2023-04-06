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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useLocation } from "react-router-dom";
import useBasicServices from "../../services/basic.service";

export default function WeaponControlStatistics() {
  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Weapon Control Statistics</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" size="small">
            Print
          </Button>
        </div>
      </div>
      <div className="PageContent">

      </div>
    </div>
  );
}
