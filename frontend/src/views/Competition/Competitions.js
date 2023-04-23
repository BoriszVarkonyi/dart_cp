import React from "react";
import { Button } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, remove, createCancelToken } from "../../services/backend.service";
import { useParams } from "react-router-dom";
import useDataGridHelper from "../../services/datagrid.service";
import ModalComp from "../../components/static/Modal/ModalComp";
import { setCompetitions, deleteCompetition } from "../../slices/compSlice";
import { useDispatch } from "react-redux";
import useBasicServices from "../../services/basic.service";
import { translateWeaponType, translateSex, translateCompType } from "../../services/translate.service";
import { useSelector } from "react-redux";

const row = (element) => {
  return {
    id: element.id,
    name: element.title_long,
    weapon_type: translateWeaponType(element.weapon_type),
    is_wheelchair: element.is_wheelchair,
    sex: translateSex(element.sex),
    type: translateCompType(element.type),
    age_group: element.age_group,
  };
};

const columns = [
  { field: "name", headerName: "NAME", width: 220, flex: 200, minWidth: 220 },
  { field: "weapon_type", headerName: "WEAPON TYPE", width: 150, flex: 150 },
  { field: "is_wheelchair", headerName: "IS WHEELCHAIR", width: 150, flex: 150 },
  { field: "sex", headerName: "SEX", width: 100, flex: 100 },
  { field: "type", headerName: "TYPE", width: 100, flex: 100 },
  { field: "age_group", headerName: "AGE GROUP", width: 150, flex: 150 },
];

export default function Competitions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setLoadingState } = useBasicServices();
  const {
    selectionModel,
    selectedRowId,
    isSelected,
    rows,
    setRows,
    handleEvent,
    deleteFunction,
    openModalFunctiom,
  } = useDataGridHelper();
  const { tournamentId } = useParams();
  const { isLoading } = useSelector((state) => state.isLoading);

  async function getData(cancelToken) {
    const data = await get(
      `tournaments/${tournamentId}/competitions/`,
      cancelToken.token
    );
    const rows = data.map((e) => row(e));
    setRows(rows);

    //Navbar menuitems works from a redux store state. This sets that state
    dispatch(setCompetitions(data));
  }

  useEffect(() => {
    setLoadingState(true);
    const cancelToken = createCancelToken();
    getData(cancelToken);
    return () => cancelToken.cancel();
  }, []);

  const deleteRow = () => {
    deleteFunction(`competitions/${selectedRowId}/`);

    //Navbar menuitems works from a redux store state. This deletes the comp from that state.
    dispatch(deleteCompetition(selectedRowId));
  };

  function CustomToolbar() {
    return (
      <div className="GridToolbar">
        <GridToolbarQuickFilter />
      </div>);
  }

  const modalProps = {
    type: "Alert",
    title: "Are you sure you want to delete this competition?",
    subtitle: "You can not undo this action!",
    confirmButtonText: "DELETE",
    deleteRow,
  };

  return (
    <>
      {!isLoading && (
        <>
          <main>
            <div className="PageHeader">
              <h1 className="PageTitle">Competitions</h1>
              <div className="PageButtonsWrapper">
                {isSelected && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={openModalFunctiom}
                  >
                    Delete
                  </Button>
                )}
                {isSelected && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      navigate("modify", { state: { rowId: selectedRowId } })
                    }
                  >
                    Modify
                  </Button>
                )}
                {!isSelected && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      navigate("create", { state: { rowId: selectedRowId } })
                    }
                  >
                    Create
                  </Button>
                )}
              </div>
            </div>
            <div className="PageContent">
              <div className="DataGridWrapper">
                <DataGrid
                  checkboxSelection={true}
                  selectionModel={selectionModel}
                  onSelectionModelChange={handleEvent}
                  rows={rows}
                  rowHeight={55}
                  columns={columns}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                />
              </div>
            </div>
          </main>
          <ModalComp modalProps={modalProps} />
        </>
      )}
    </>
  );
}
