import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice";
import { remove } from "./backend.service";
import { get } from "./backend.service";

export default function useDataGridHelper() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();

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

  //Sets the isOpen value to true in the redux sotre. 
  //Briefly: Opens the Modal.
  const openModalFunctiom = () => {
    dispatch(openModal());
  };

  const deleteFunction = async (url, payload) => {
    //Deletes the tournament in the database
    await remove(url, payload);
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



  return {
    isSelected,
    selectedRowId, 
    selectionModel, 
    rows, 
    setIsSelected,
    setSelectionModel,
    setRows,
    handleEvent,
    deleteFunction,
    openModalFunctiom
  };
}
