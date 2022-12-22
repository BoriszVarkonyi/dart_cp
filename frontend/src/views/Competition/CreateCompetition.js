import React, { useState } from "react";

import {
  FormControl,
  MenuItem,
  TextField,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

export default function CreateCompetition() {
  const [weaponType, setWeaponType] = useState("");
  const [isWheel, setIsWheel] = useState(false);
  const [sex, setSex] = useState("");
  const [compType, setCompType] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [hostCountry, setHostCountry] = useState("");

  const handleChange = (event, type) => {
    const value = event.target.value;
    switch (type) {
      case "weaponType":
        setWeaponType(value);
        break;
      case "wheelChair":
        setIsWheel(value);
        break;
      case "sex":
        setSex(value);
        break;
      case "compType":
        setCompType(value);
        break;
      case "ageGroup":
        setAgeGroup(value);
        break;
      case "hostCountry":
        setHostCountry(value);
        break;
      default:
      // code block
    }
  };
  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Create competition</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained">CANCEL</Button>
          <Button variant="contained">CREATE COMPETITION</Button>
        </div>
      </div>
      <div className="Panel">
        <Box component="form" display="flex" flexDirection="column" noValidate>
          <TextField
            label="Name"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
          />

          <FormControl variant="filled">
            <InputLabel id="weapon-type">Weapon type</InputLabel>
            <Select
              labelId="weapon-type"
              value={weaponType}
              onChange={(e) => handleChange(e, "weaponType")}
            >
              <MenuItem value="epee">Epee</MenuItem>
              <MenuItem value="foil">Foil</MenuItem>
              <MenuItem value="sabre">Sabre</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled">
            <InputLabel id="wheelchair">Wheelchair</InputLabel>
            <Select
              labelId="wheelchair"
              value={isWheel}
              onChange={(e) => handleChange(e, "wheelChair")}
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled">
            <InputLabel id="sex">Sex</InputLabel>
            <Select
              labelId="sex"
              value={sex}
              onChange={(e) => handleChange(e, "sex")}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="mix">Mix</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled">
            <InputLabel id="compType">Competition type</InputLabel>
            <Select
              labelId="compType"
              value={compType}
              onChange={(e) => handleChange(e, "compType")}
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="team">Team</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled">
            <InputLabel id="ageGroup">Age group</InputLabel>
            <Select
              labelId="ageGroup"
              value={compType}
              onChange={(e) => handleChange(e, "ageGroup")}
            >
              <MenuItem value="cadet">Cadet</MenuItem>
              <MenuItem value="junior">Junior</MenuItem>
              <MenuItem value="u23">U23</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
              <MenuItem value="veteran">Veteran</MenuItem>
              <MenuItem value="">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled">
            <InputLabel id="hostCountry">Age group</InputLabel>
            <Select
              labelId="hostCountry"
              value={compType}
              onChange={(e) => handleChange(e, "hostCountry")}
            >
              <MenuItem value="test">Biztos hogy nem írom ki</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Address and location"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
          />

          <TextField
            label="Entry fee"
            type="number"
            margin="normal"
            size="small"
            variant="filled"
          />
          <TextField
            label="Currency"
            type="text"
            margin="normal"
            size="small"
            variant="filled"
          />

          <TextField
            id="date"
            label="Starting Date"
            type="date"
            size="small"
            variant="filled"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
          />
          <TextField
            id="date"
            label="Ending Date"
            type="date"
            size="small"
            variant="filled"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
          />
        </Box>
      </div>
    </div>
  );
}
