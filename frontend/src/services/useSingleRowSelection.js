import React, { useState, useEffect } from "react";

export default function useSingleRowSelection() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
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

  return {
    isSelected,
    selectedRowId,
    selectionModel,
    handleEvent
  };
}
