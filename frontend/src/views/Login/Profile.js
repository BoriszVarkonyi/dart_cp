import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { combineReducers } from "redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "./../../services/auth.services"

const Profile = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);



  const test = () => {
    navigate("/panel")
  }

  const test2 = () =>{
    AuthService.logout();
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="Panel">
      <h1>This is a tempomary website</h1>
      <header>
        <h3>
          username: <strong>{currentUser.meta.arg.username}</strong>
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.payload.user.access.substring(0, 20)} ...{" "}
        {currentUser.payload.user.access.substr(currentUser.payload.user.access.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.meta.requestId}
      </p>
      <Button variant="contained" onClick={test}> Next Page</Button>
      <Button variant="contained" onClick={test2}> Log oute</Button>
    </div>
  );
};

export default Profile;