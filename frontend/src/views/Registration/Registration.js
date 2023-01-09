import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
<<<<<<< HEAD
import ModalComp from "../../components/static/Modal/ModalComp";
import { useDispatch } from "react-redux";
import useDataGridHelper from "../../services/useDataGridHelper";
=======
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { get, update } from "../../services/backend.service";
import { useNavigate } from "react-router-dom";
import useDataGridHelper from "../../services/useDataGridHelper";
import ModalComp from "../../components/static/Modal/ModalComp";

const columns = [
    { field: "nom", headerName: "First Name" },
    { field: "pre_nom", headerName: "Last Name" },
    { field: "nation", headerName: "Nationality" },
    { field: "date_naissance", headerName: "Date of Birth" },
    { field: "sexe", headerName: "Sex" },
    { field: "registration_status", headerName: "Status"}
];
>>>>>>> e2e5b428a9dbe61ad22708e6099405ec01115dc3

export default function Registration() {
    const {
        selectionModel,
        selectedRowId,
        isSelected,
        rows,
        setRows,
        handleEvent,
        deleteFunction,
<<<<<<< HEAD
        openModalFunctiom,
      } = useDataGridHelper();
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.modal);

    const modalContent = {

    }

=======
        openModalFunctiom
    } = useDataGridHelper();
    const navigate = useNavigate();
    const { tourId, compId } = useParams();


    useEffect(() => {
        async function getFencersData() {
            const data = await get(`competitions/${compId}/fencers/`);
            setRows(data);
        }
        getFencersData();
    }, []);

    function updateRows() {
        setRows((prevRows) => {
            return prevRows.map(f => 
                f.id == selectedRowId ? { ...f, registration_status: !f.registration_status } : f
            );
        });
    }

    async function registerIn() {
        if(isSelected) {
            await update(`fencers/${selectedRowId}/`, { registration_status: true });
            updateRows();
        }
    }

    async function registerOut() {
        if(isSelected) {
            await update(`fencers/${selectedRowId}/`, { registration_status: false });
            updateRows();
        }
    }
>>>>>>> e2e5b428a9dbe61ad22708e6099405ec01115dc3
    return (
        <>
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Registration</h2>
                <div className="PageButtonsWrapper">
<<<<<<< HEAD
                    <Button variant="contained" size="small" onClick={openModalFunctiom}>Print Barcodes</Button>
                    <Button variant="contained" size="small">Register out</Button>
                    <Button variant="contained" size="small">Register in</Button>
=======
                    <Button variant="contained" size="small">Print Barcodes</Button>
                    {isSelected && rows.filter(f => f.id == selectedRowId)[0].registration_status && (
                        <Button variant="contained" size="small" onClick={registerOut}>Register out</Button>
                    )}
                    {isSelected && !rows.filter(f => f.id == selectedRowId)[0].registration_status && (
                        <Button variant="contained" size="small" onClick={registerIn}>Register in</Button>
                    )}
>>>>>>> e2e5b428a9dbe61ad22708e6099405ec01115dc3
                    <Button variant="contained" size="small">Assign Barcode</Button>
                </div>
            </div>
            <div className="PageContent">
                <div className="TableGrid">
                    <div style={{ height: 300, width: "100%"}}>
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
        <ModalComp type="Barcode" title="Barcode?" content={modalContent} />
        </>
    )
}