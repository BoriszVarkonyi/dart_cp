import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { get } from "../../services/backend.service";


const columns = [
    {field: "classement", headerName: "Ranking"},
    {field: "points", headerName: "Points"},
    {field: "nom", headerName: "Last Name"},
    {field: "pre_nom", headerName: "First Name"},
    {field: "nation", headerName: "Nationality"},
    {field: "club", headerName: "Club"},
    {field: "date_naissance", headerName: "Date of Birth"},
    {field: "sexe", headerName: "Sex"},
    {field: "lateralite", headerName: "Lateralite"},
    {field: "licence", headerName: "Licence"},
    {field: "reg_status", headerName: "Reg. Status"},
    {field: "wc_status", headerName: "Wc. Status"},
];

export default function Competitors() {
    const [isSelected, setIsSelected] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState();
    const [selectionModel, setSelectionModel] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getFencersData() {
            const data = await get("fencers/");
            setRows(data);
        }
        getFencersData();
    }, []);

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


    return (
        <div className="Main">
            <div className="PageHeader">
                <h2 className="PageTitle">Competitors</h2>
                <div className="PageButtonsWrapper">
                    <Button variant="contained">Import XML</Button>
                    <Button variant="contained" /*onClick={deleteButton}*/>Delete</Button>
                    <Button variant="contained" /*onClick={modifyButton}*/>Modify</Button>
                    <Button variant="contained" /*onClick={createButton}*/>Create</Button>
                </div>
            </div>
            <div className="PanelContentSingle">
                <div className="TableGrid">
                    <div style={{ height: 300, width: "100%" }}>
                        <DataGrid
                        checkboxSelection={false}
                        selectionModel={selectionModel}
                        onSelectionModelChange={handleEvent}
                        rows={rows}
                        columns={columns}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}