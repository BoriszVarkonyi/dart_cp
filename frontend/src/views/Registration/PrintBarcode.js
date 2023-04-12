import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { get } from '../../services/backend.service';
import "../../StickerPrinting.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
      {/*
      <div className="Main">
        <Card sx={{ maxWidth: 320 }} ref={cardRef}>
          <CardMedia sx={{ height: 350 }} title="">
            <QRCodeSVG value={hash} size="320" />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {fencer.nom} {fencer.pre_nom}
            </Typography>
            <Typography gutterBottom variant="p" component="div" align="center">
              {fencer.nation ?? fencer.club}
            </Typography>
          </CardContent>
          <CardActions>
            <ReactToPrint
              trigger={() => (
                <Button
                  size="large"
                  sx={{ '@media print': { display: 'none' } }}
                >
                  Print
                </Button>
              )}
              content={() => cardRef.current}
            />
          </CardActions>
        </Card>
      </div>
    */}

    </>
  );
}
