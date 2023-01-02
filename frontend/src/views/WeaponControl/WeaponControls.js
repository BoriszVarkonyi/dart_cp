import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const row = (element) => {
  return {
    barCode: element.barcode,
    wcName: element.pre_nom + " " + element.nom,
    wcNat: element.nation,
    wcClub: element.club,
    wcDTB: element.date_naissance,
    wcSex: element.sexe,
    wcStatus: element.statut,
  };
};

//Sets the columns
const columns = [
  { field: "barCode", headerName: "BARCODE", width: 200 },
  { field: "wcName", headerName: "NAME", width: 200 },
  { field: "wcNat", headerName: "NATIONALITY", width: 200 },
  { field: "wcClub", headerName: "CLUB", width: 200 },
  { field: "wcDTB", headerName: "DATE OF BIRTH", width: 200 },
  { field: "wcSex", headerName: "SEX", width: 200 },
  { field: "wcStatus", headerName: "STATUS", width: 200 },
];

export default function WeaponControls() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  //Makes only one row selected
  const handleEvent = (params) => {
    if (params.length > 1) {
      const selectionSet = new Set(selectionModel);
      const result = params.filter((s) => !selectionSet.has(s));
      setSelectionModel(result);
    } else {
      setSelectionModel(params);
    }
  };

  useEffect(() => {
    selectionModel.length == 1 ? setIsSelected(true) : setIsSelected(false); //Sets the isSelected state
    setSelectedRowId(selectionModel[0]); //Updates selectedRowId
  }, [selectionModel]);

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Weapon Control</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained">Remove</Button>
          <Button variant="contained">Modify</Button>
          <Button variant="contained">Add</Button>
          <Button variant="contained">Read Barcode</Button>
        </div>
      </div>
      <div className="PanelContentSingle">
        <div className="TableGrid">
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              checkboxSelection={true}
              selectionModel={selectionModel}
              onSelectionModelChange={handleEvent}
              rows={rows}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
