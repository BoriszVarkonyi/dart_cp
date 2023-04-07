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
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>No. Fencers</th>
              <th>No. Issues</th>
              <th>Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>United Kingdom</td>
              <td>10</td>
              <td>20</td>
              <td>2</td>              
            </tr>
            <tr>
              <td>Germany</td>
              <td>5</td>
              <td>5</td>
              <td>1</td>              
            </tr>
            <tr>
              <td>Hungary</td>
              <td>12</td>
              <td>6</td>
              <td>0.5</td>              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
