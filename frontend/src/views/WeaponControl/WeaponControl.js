import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { get, post } from "../../services/backend.service";
import { TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";

export default function WeaponControl(props) {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();
  const { tourId, compId } = useParams();
  const { state } = useLocation();
  const { fencerId } = state;

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const generateTR = (key, keyValue, rowKey) => {
    return (
      <tr key={rowKey}>
        <td>{key}</td>
        <td>
          <TextField
            type="number"
            size="small"
            {...register(`issue_${rowKey + 1}`)}
          />
        </td>
      </tr>
    );
  };

  const onSubmit = async (data) => {
    for (const key of Object.keys(data)) {
      if (data[key] == "") {
        if (key != "notes") {
          data[key] = 0;
        }
      } else {
        data[key] = parseInt(data[key]);
      }
    }

    console.log(data);
    const response = await post(`stats/weaponcontrols/issues/${compId}/${fencerId}/`);
  };

  //Gets the issues from api
  useEffect(() => {
    async function getData() {
      const data = await get(
        `stats/weaponcontrols/issues/${compId}/${fencerId}/`
      );
      let testArray = [];

      let rowKey = 0;
      for (const key of Object.keys(data)) {
        if (key != "exists" && key != "notes") {
          const row = generateTR(key, data[key], rowKey);
          testArray.push(row);
          rowKey++;
        }
      }
      setIssues(testArray);
    }
    getData();
  }, []);

  const title = `${props.type} Weapon control of`;
  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle"> {title}</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" form="issue-form">
            Save weapon control
          </Button>
        </div>
      </div>
      <div className="Panel">
        <Box
          component="form"
          id="issue-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <table>
            <thead>
              <tr>
                <td>ISSUES</td>
                <td>QUANTITY</td>
              </tr>
            </thead>
            <tbody>{issues}</tbody>
          </table>
          <textarea {...register(`notes`)}></textarea>
        </Box>
      </div>
    </div>
  );
}
