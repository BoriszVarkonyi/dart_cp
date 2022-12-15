import React from "react";
import "./LoginLayout.styles.css";
import fencersImage from "../../../assets/fencers.svg";
import horseImage from "../../../assets/horse.svg";
import Login from "../../../views/Login/Login";
export default function LoginLayout() {
    return (
        <div className="LoginLayout">
            <div className="LoginBlock">
                <div className="LoginHeader">
                    <img className="LogoImage" src={horseImage} />
                    <h1 className="LoginText">Login</h1>
                </div>
                <Login />
                <p className="CopyrightText">© d'ARTAGNAN 2022</p>
            </div>
            <div className="LoginBackground">
                <img className="FencersImage" src={fencersImage} />
            </div>
        </div>
    );
}
