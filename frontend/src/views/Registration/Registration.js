import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { get, post } from "../../services/backend.service";
import { useNavigate } from "react-router-dom";
import useDataGridHelper from "../../services/useDataGridHelper";
import { useLocation } from "react-router-dom";
import useBasicServices from "../../services/basic.service";

const columns = [
    { field: "nom", headerName: "First Name" },
    { field: "pre_nom", headerName: "Last Name" },
    { field: "nation", headerName: "Nationality" },
    { field: "date_naissance", headerName: "Date of Birth" },
    { field: "sexe", headerName: "Sex" },
    { field: "registered", headerName: "Status" },
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
        openModalFunctiom,
    } = useDataGridHelper();
    const navigate = useNavigate();
    const location = useLocation();
    const { tourId, compId } = useParams();
    const basicServices = useBasicServices();

    async function getFencersData() {
        const fencersData = await get(`competitions/${compId}/fencers/`);
        const registrationData = await getRegistrationData();
        setRows(fencerInCompetition(fencersData, registrationData));
    }

    async function getRegistrationData() {
        return await get(`competitions/${compId}/registrations/`);
    }

    //Gets the data from api. Updates the data on route change. For example when another comp is selected.
    useEffect(() => {
        getFencersData();
    }, [location]);


    function fencerInCompetition(fencers, registartions) {
        return fencers.map((f) => {
            const registrationArray = registartions.filter((r) => f.id == r.fencers);
            if (registrationArray.length == 1) {
                return { ...f, registered: registrationArray[0].registered };
            } else {
                return { ...f, registered: false };
            }
        });
    }

    function updateRows() {
        setRows((prevRows) => {
            return prevRows.map((f) =>
                f.id == selectedRowId ? { ...f, registered: !f.registered } : f
            );
        });
    }

    async function registerIn() {
        if (isSelected) {
            const selectedFencer = rows.filter((f) => f.id == selectedRowId)[0];
            selectedFencer.competitions = [
                ...selectedFencer.competitions,
                parseInt(compId),
            ];
            await post(`in-register/${compId}/${selectedRowId}/`);
            updateRows();
        }
    }

    async function registerOut() {
        if (isSelected) {
            const selectedFencer = rows.filter((f) => f.id == selectedRowId)[0];
            selectedFencer.competitions = selectedFencer.competitions.filter(
                (c) => c != parseInt(compId)
            );
            await post(`un-register/${compId}/${selectedRowId}/`);
            updateRows();
        }
    }

    const modalContent = {};

    return (
        <>
            <div className="Main">
                <div className="PageHeader">
                    <h2 className="PageTitle">Registration</h2>
                    <div className="PageButtonsWrapper">
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate("print")}
                        >
                            Print Barcodes
                        </Button>
                        {isSelected &&
                            rows.filter((f) => f.id == selectedRowId)[0].registered && (
                                <>
                                    <Button variant="contained" size="small">
                                        Print Code
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={registerOut}
                                    >
                                        Register out
                                    </Button>
                                </>
                            )}
                        {isSelected &&
                            !rows.filter((f) => f.id == selectedRowId)[0].registered && (
                                <Button variant="contained" size="small" onClick={registerIn}>
                                    Register in
                                </Button>
                            )}
                        <Button variant="contained" size="small">
                            Print Barcode
                        </Button>
                    </div>
                </div>
                <div className="PageContent">
                    <div className="TableGrid">
                        <DataGrid
                            style={{ height: "100%", width: "100%" }}
                            checkboxSelection={true}
                            selectionModel={selectionModel}
                            onSelectionModelChange={handleEvent}
                            rows={rows}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
