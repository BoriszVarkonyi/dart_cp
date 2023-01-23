import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { get, post, update } from "../../services/backend.service";
import { TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";

export default function WeaponControl(props) {
  const [issues, setIssues] = useState([]);
  const [notes, setNotes] = useState("")
  const navigate = useNavigate();
  const { tourId, compId } = useParams();
  const { state } = useLocation();
  const { rowId } = state;

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
            defaultValue={keyValue}
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
        if (key != "notes") {
          data[key] = parseInt(data[key]);
        }
      }
    }

    if ((props.type == "Add")) {
      await post(`stats/weaponcontrols/issues/${compId}/${rowId}/`, data);
    }
    if ((props.type == "Modify")) {
      await update(`stats/weaponcontrols/issues/${compId}/${rowId}/`, data);
    }
    navigate(-1)
  };

  //Gets the issues from api
  useEffect(() => {
    async function getData() {
      const data = await get(`stats/weaponcontrols/issues/${compId}/${rowId}/`);

      let testArray = [];

      let rowKey = 0;
      for (const key of Object.keys(data)) {
        if(key =="notes"){
          setNotes(data[key])
        }
        if (key != "exists" && key != "notes") {
          if (props.type == "Modify") {
            const row = generateTR(key, data[key], rowKey);
            testArray.push(row);
          }
          if (props.type == "Add") {
            const row = generateTR(key, undefined, rowKey);
            testArray.push(row);
          }
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
      <div className="PageContent WithSideBar">
        <Box
          component="form"
          id="issue-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="PageContentInner">
            <table>
              <thead>
                <tr>
                  <td>ISSUES</td>
                  <td>QUANTITY</td>
                </tr>
              </thead>
              <tbody>{issues}</tbody>
            </table>
          </div>
          <div className="SideBar">
            <TextField
              id="outlined-textarea"
              label="Notes"
              placeholder="Type in the additional notes here"
              multiline
              value={notes}
              {...register(`notes`,{
                onChange: (e)=> setNotes(e.target.value)
              }
              )}
            />
          </div>
        </Box>
      </div>
    </div>
  );
}
