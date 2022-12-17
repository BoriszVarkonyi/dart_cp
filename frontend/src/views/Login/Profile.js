import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { combineReducers } from "redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser)

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="Panel">
      <header>
        <h3>
          <strong>{currentUser.meta.arg.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.payload.user.access.substring(0, 20)} ...{" "}
        {currentUser.payload.user.access.substr(currentUser.payload.user.access.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.meta.requestId}
      </p>
    </div>
  );
};

export default Profile;