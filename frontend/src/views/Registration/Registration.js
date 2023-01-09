import React from "react";
import { Button } from "@mui/material";
import ModalComp from "../../components/static/Modal/ModalComp";
import { useDispatch } from "react-redux";
import useDataGridHelper from "../../services/useDataGridHelper";

export default function Registration() {
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
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.modal);

    const modalContent = {

    }

    return (
        <>
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Registration</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained" size="small" onClick={openModalFunctiom}>Print Barcodes</Button>
                    <Button variant="contained" size="small">Register out</Button>
                    <Button variant="contained" size="small">Register in</Button>
                    <Button variant="contained" size="small">Assign Barcode</Button>
                </div>
            </div>
            <div className="PageContent">
                <div className="TableGrid">

                </div>
            </div>
        </div>
        <ModalComp type="Barcode" title="Barcode?" content={modalContent} />
        </>
    )
}