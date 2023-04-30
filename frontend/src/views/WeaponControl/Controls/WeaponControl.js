import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { get, post, update } from "../../../services/backend.service";
import { TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import Issue from "./Issue";
import { useDispatch } from "react-redux";
import {useCrossTabState} from "../../../services/crosstab.service"

export default function WeaponControl(props) {
  const [issues, setIssues] = useState([]);
  const [fencerName, setFencerName] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { tourId, compId } = useParams();
  const { state } = useLocation();
  const { rowId } = state;
  const [exists, setExists] = useState(false);
  const [wcReport, setWcReport] = useCrossTabState("weaponcontrols", [])

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    for (const key of Object.keys(data)) {
      if (data[key] == "") {
        //If the data value is empty
        if (key != "notes") {
          data[key] = 0;
        }
      } else {
        if (key != "notes") {
          data[key] = parseInt(data[key]);
        }
      }
    }
    data["notes"] == "" ? (data["notes"] = null) : (data["notes"] = notes);

    if (exists)
      await update(`stats/weaponcontrols/issues/${compId}/${rowId}/`, data);
    else await post(`stats/weaponcontrols/issues/${compId}/${rowId}/`, data);
    navigate(-1);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  //Gets the issue datas from api
  useEffect(() => {
    async function getData() {
      const data = await get(`stats/weaponcontrols/issues/${compId}/${rowId}/`);
      setExists(data.exists);

      let inputArray = [];

      let rowKey = 0;
      //Creates the issue rows
      for (const key of Object.keys(data)) {
        if (key == "notes") {
          data[key] == null ? setNotes("") : setNotes(data[key]);
        }
        if (key == "fencer_name") {
          setFencerName(data[key]);
        }

        if (key !== "exists" && key !== "notes" && key !== "fencer_name") {
          inputArray.push(
            <Issue
              key={key}
              issueName={key}
              issueNum={data[key] ?? 0}
              rowKey={rowKey + 1}
              register={register}
              errors={errors}
            />
          );
          rowKey++;
        }
      }

      setIssues(inputArray);
    }
    getData();
    //dispatch(setWeaponControls("test"))
  }, []);

  const title = `${props.type} Weapon Control of ${fencerName}`;
  return (
    <main>
      <div className="PageHeader">
        <h1 className="PageTitle">{title}</h1>
        <div className="PageButtonsWrapper">
          <Button variant="contained" size="small" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            type="submit"
            form="issue-form"
          >
            Save weapon control
          </Button>
        </div>
      </div>
      <div className="PageContent WithSideBar">
        <Box
          className="PageContentInner Form"
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
        </Box>
        <div className="SideBar">
          <TextField
            id="outlined-textarea"
            label="Notes"
            form="issue-form"
            placeholder="Type in the additional notes here"
            multiline
            value={notes}
            {...register(`notes`, {
              onChange: (e) => setNotes(e.target.value),
            })}
          />
        </div>
      </div>
    </main>
  );
}
