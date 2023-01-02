import React from "react";
import styles from "./Header.module.css"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
    return (
        <div className={styles.Header}>
            <p className="UserNameText">Username</p>
            <Button>Logout</Button>
        </div>
    );
}
