import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
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

export default function Registration() {
    const {
        selectionModel,
        selectedRowId,
        isSelected,
        rows,
        setRows,
        handleEvent,
        deleteFunction,
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

const modalContent = {

}

    return (
        <>
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Registration</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained" size="small" onClick={openModalFunctiom}>Print Barcodes</Button>
                    {isSelected && rows.filter(f => f.id == selectedRowId)[0].registration_status && (
                        <Button variant="contained" size="small" onClick={registerOut}>Register out</Button>
                    )}
                    {isSelected && !rows.filter(f => f.id == selectedRowId)[0].registration_status && (
                        <Button variant="contained" size="small" onClick={registerIn}>Register in</Button>
                    )}
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