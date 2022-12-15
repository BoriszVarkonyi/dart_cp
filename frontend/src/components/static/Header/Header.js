import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="Header">
            <p>Én avgyok a Header</p>
        </div>
    );
}
