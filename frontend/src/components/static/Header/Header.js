import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
    return (
        <div className="Header">      
        {/* <Button onClick={logout}>Log out</Button> */}
            <p>Én avgyok a Header</p>
        </div>
    );
}
