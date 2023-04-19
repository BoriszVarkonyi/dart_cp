import React from "react";
import { get } from '../../../services/backend.service';
import { useState, useEffect } from "react";

export default function WCPrintHeader(props) {
  const compId = props.compId;
  const tournamentId = props.tournamentId;
  const [currentComp, setCurrentComp] = useState();
  const [currentTour, setCurrentTour] = useState();
  async function getData() {
    const comp = await get(`competitions/${compId}`);
    const tour = await get(`tournaments/${tournamentId}`);

    setCurrentComp(comp);
    setCurrentTour(tour);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="DocumentHeader DocumentColumnLayout">
      <div className="DocumentHeaderLeft">
        <div>
          <p className="DocumentHeaderTitle">WEAPON CONTROL</p>
          <p className="DocumentHeaderTitleExtension">STATISTICS</p>
          <p className="DocumentHeaderSubtitle">
            Generated by: <span>DARTGANAN</span>
          </p>
        </div>
      </div>
      <div className="DocumentHeaderMiddle">
        <b>]comp title]</b>
        <p>]tournament title]</p>
      </div>
      <div className="DocumentHeaderRight">
        <p>]sex?]</p>
        <p>]comptype]</p>
        <p>]age gruppe]</p>
        <p>]host country]</p>
        <p>]évvvvvvvvvvvvvvvvvvvvvvvvvvvv]</p>
      </div>
    </div>
  );
}
