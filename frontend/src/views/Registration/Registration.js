import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { get, update } from "../../services/backend.service";
import { useNavigate } from "react-router-dom";
import useDataGridHelper from "../../services/useDataGridHelper";

const columns = [
    { field: "nom", headerName: "First Name" },
    { field: "pre_nom", headerName: "Last Name" },
    { field: "nation", headerName: "Nationality" },
    { field: "date_naissance", headerName: "Date of Birth" },
    { field: "sexe", headerName: "Sex" },
    { field: "in_competition", headerName: "Status" }
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
            const data = await get(`fencers/`);
            setRows(fencerInCompetition(data));
        }
        getFencersData();
    }, []);

    // For some reason I cannot use Array.includes()
    function fencerInCompetition(fencers) {
        return fencers.map(f =>
            f.competitions.filter(c => c == compId).length == 0
                ? { ...f, in_competition: false }
                : { ...f, in_competition: true }
        );
    }

    function updateRows() {
        setRows((prevRows) => {
            return prevRows.map(f =>
                f.id == selectedRowId ? { ...f, in_competition: !f.in_competition } : f
            );
        });
    }

    async function registerIn() {
        if (isSelected) {
            const selectedFencer = rows.filter(f => f.id == selectedRowId)[0];
            selectedFencer.competitions = [...selectedFencer.competitions, parseInt(compId)];
            await update(`fencers/${selectedRowId}/`, { competitions: selectedFencer.competitions });
            updateRows();
        }
    }

    async function registerOut() {
        if (isSelected) {
            const selectedFencer = rows.filter(f => f.id == selectedRowId)[0];
            selectedFencer.competitions = selectedFencer.competitions.filter(c => c != parseInt(compId));
            await update(`fencers/${selectedRowId}/`, { competitions: selectedFencer.competitions });
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
                        <Button variant="contained" size="small" onClick={() => navigate("print")}>Print Barcodes</Button>
                        {isSelected && rows.filter(f => f.id == selectedRowId)[0].in_competition && (
                            <>
                                <Button variant="contained" size="small">Print Code</Button>
                                <Button variant="contained" size="small" onClick={registerOut}>Register out</Button>
                            </>
                        )}
                        {isSelected && !rows.filter(f => f.id == selectedRowId)[0].in_competition && (
                            <Button variant="contained" size="small" onClick={registerIn}>Register in</Button>
                        )}
                        <Button variant="contained" size="small">Print Barcode</Button>
                    </div>
                </div>
                <div className="PageContent">
                    <div className="TableGrid">
                        <div style={{ height: 600, width: "100%" }}>
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
        </>
    )
}