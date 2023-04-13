import { Modal } from "@mui/material";
import React from "react";
import Fencer1SVG from "../../../assets/fencer1.svg"
import Fencer2SVG from "../../../assets/fencer2.svg"
import { useSelector } from "react-redux";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.isLoading);

  return (
    <>
      {/*isLoading &&*/ (
        <div className="LoadingModal">
          <div className="LoadingAnimation">
            <img src={Fencer1SVG} className="Fencer1" />
            <img src={Fencer2SVG} className="Fencer2" />
          </div>
        </div>)}
    </>
  );
}
