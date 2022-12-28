import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { get } from "../../services/backend.service";
import { useNavigate } from "react-router-dom";

const row = (element) => {
  return {
    id: element.id,
    classement: element.classement,
    points: element.points,
    nom: element.nom,
    pre_nom: element.pre_nom,
    nation: element.nation,
    club: element.club,
    date_naissance: element.date_naissance,
    sexe: element.sexe,
    lateralite: element.lateralite,
    licence: element.licence,
    reg_status: element.reg_status,
    wc_status: element.wc_status,
  };
};

const test = [{id: 1, classement: "test", points: "sok", nom: "Neve", pre_nom: "nev", nation: "Narnia", club:" night", date_naissance: "pls", sexe: "end", lateralite: "my", licence:"suffer", reg_status:"japp", wc_status:"szabad"}]

const columns = [
  { field: "classement", headerName: "Ranking" },
  { field: "points", headerName: "Points" },
  { field: "nom", headerName: "Last Name" },
  { field: "pre_nom", headerName: "First Name" },
  { field: "nation", headerName: "Nationality" },
  { field: "club", headerName: "Club" },
  { field: "date_naissance", headerName: "Date of Birth" },
  { field: "sexe", headerName: "Sex" },
  { field: "lateralite", headerName: "Lateralite" },
  { field: "licence", headerName: "Licence" },
  { field: "reg_status", headerName: "Reg. Status" },
  { field: "wc_status", headerName: "Wc. Status" },
];

export default function Competitors() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [selectionModel, setSelectionModel] = useState([]);
  const [rows, setRows] = useState(test);
  const navigate = useNavigate();

  //Gets the competitors from api
  //   useEffect(() => {
  //     async function getFencersData() {
  //       const data = await get("fencers/");
  //       setRows(data);
  //     }
  //     getFencersData();
  //   }, []);

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
    selectionModel.length == 1 ? setIsSelected(true) : setIsSelected(false);
    setSelectedRowId(selectionModel[0]);
  }, [selectionModel]);

  //Will be usefull
  //   const deleteButton = async () => {
  //     //Deletes the tournament in the database
  //     await remove(`tournaments/${selectedRowId}/`);

  //     //Deletes the row in the data grid
  //     setRows((prevRows) => {
  //       const rowToDeleteIndex = prevRows.findIndex(
  //         (row) => row.id == selectedRowId
  //       );
  //       return [
  //         ...rows.slice(0, rowToDeleteIndex),
  //         ...rows.slice(rowToDeleteIndex + 1),
  //       ];
  //     });
  //   };

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Competitors</h2>
        <div className="PageButtonsWrapper">
          {!isSelected && <Button variant="contained">Import XML</Button>}
          {isSelected && (
            <Button variant="contained" /*onClick={deleteButton}*/>
              Delete
            </Button>
          )}
          {isSelected && (
            <Button variant="contained" /*onClick={modifyButton}*/>
              Modify
            </Button>
          )}
          {!isSelected && (
            <Button variant="contained" onClick={() => navigate("add")}>
              Create
            </Button>
          )}
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
