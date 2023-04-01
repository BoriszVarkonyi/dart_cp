import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { get } from '../../services/backend.service';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PrintBarcode() {
  const { tournamentId, compId, fencerId } = useParams();
  const [fencer, setFencer] = useState({});

  async function getFencerData() {
    const f = await get(`fencers/${fencerId}`);
    setFencer(f);
  }

  useEffect(() => {
    getFencerData();
  }, []);

  return (
    <>
      <div className="Main">
        <Card sx={{ maxWidth: 320 }}>
          <CardMedia sx={{ height: 350 }} title="">
            <QRCodeSVG value="https://youtu.be/dQw4w9WgXcQ" size="320" />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {fencer.nom} {fencer.pre_nom}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Print</Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
