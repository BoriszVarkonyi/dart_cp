import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { get } from '../../services/backend.service';
import "../../StickerPrinting.css";

export default function PrintBarcode() {
  const { tournamentId, compId, fencerId } = useParams();
  const [fencer, setFencer] = useState({});
  const [hash, setHash] = useState();

  async function getFencerHash() {
    const hashedData = await get(`gethash/${compId}/${fencerId}`);
    setHash(JSON.stringify(hashedData));
  }

  async function getFencerData() {
    const f = await get(`fencers/${fencerId}`);
    setFencer(f);
  }

  useEffect(() => {
    getFencerData();
    getFencerHash();
  }, []);

  const cardRef = useRef();

  return (
    <>
      <div className="PrintableSticker">
        <div className="Sticker">
          <QRCodeSVG value={hash} size="350" />
          <div>
            <b className="StickerName">Kristóf WOLFRAM Kristóf WOLFRAM</b>
            <p className="StickerNationality">UZBEGISTAN UZBEGISTAN UZBEGISTAN</p>
          </div>
          <b className="StickerCode">0905151</b>
          <p className="StickerWhitemark">Made with: <b>D'ARTGANAN CONTROL</b></p>
        </div>
      </div>
    </>
  );
}
