import React from "react";
import "./ControlLayout.styles.css";
import { Route, Routes } from "react-router-dom";
import { ControlRoutes } from "./ControlRoutes";
import NavBar from "../../static/NavBar/NavBar";
import Header from "../../static/Header/Header";


export default function ControlLayout() {
    return (

        <div className="ControlLayout">
            <Header />
            <NavBar />
            <Routes>
                <Route path=":id/*" element={<ControlRoutes />} />
            </Routes>
        </div>

    )
}