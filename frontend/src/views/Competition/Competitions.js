import React from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, remove } from "../../services/backend.service";

const columns = [
  { field: "name", headerName: "NAME", width: 200 },
  { field: "weapon_type", headerName: "WEAPON TYPE", width: 200 },
  { field: "is_wheelchair", headerName: "IS WHEELCHAIR", width: 200 },
  { field: "sex", headerName: "SEX", width: 200 },
  { field: "type", headerName: "TYPE", width: 200 },
  { field: "age_group", headerName: "AGE GROUP", width: 200 },
];

//test rows
const test = [
  {
    id: 69,
    name: "test",
    weapon_type: "test",
    is_wheelchair: true,
    sex: "csakisegy",
    type: "battleroyal",
    age_group: "10 évesek",
  },
  {
    id: 67,
    name: "test1",
    weapon_type: "test1",
    is_wheelchair: true,
    sex: "csakisegy1",
    type: "battleroyal1",
    age_group: "10 évesek1",
  },
];

export default function Competitions() {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [selectionModel, setSelectionModel] = useState([]);
  const [rows, setRows] = useState(test);

  //Gets the tournaments from api
  // useEffect(() => {
  //     async function getFencersData() {
  //         const data = await get("competitions/");
  //         setRows(data);
  //     }
  //     getFencersData();
  // }, []);

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


  const deleteButton = async () => {
    //Deletes the tournament in the database
    await remove(`competitions/${selectedRowId}/`);

    //Deletes the row in the data grid
    setRows((prevRows) => {
      const rowToDeleteIndex = prevRows.findIndex(
        (row) => row.id == selectedRowId
      );
      return [
        ...rows.slice(0, rowToDeleteIndex),
        ...rows.slice(rowToDeleteIndex + 1),
      ];
    });
  };

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Competitions</h2>
        <div className="PageButtonsWrapper">
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
            <Button variant="contained" onClick={() => navigate("create")}>
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
