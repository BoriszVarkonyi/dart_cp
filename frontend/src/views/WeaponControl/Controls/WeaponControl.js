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
import { useCrossTabState } from "../../../services/crosstab.service";

export default function WeaponControl(props) {
  const [issues, setIssues] = useState([]);
  const [fencerName, setFencerName] = useState("");
  const [fencerNation, setFencerNation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { tournamentId, compId } = useParams();
  const { state } = useLocation();
  const { rowId } = state;
  const [exists, setExists] = useState(false);
  const [wcReport, setWcReport] = useCrossTabState(
    tournamentId + "_weapon_control_report",
    []
  );

  //react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let issueArray = [];
    for (const key of Object.keys(data)) {
      if (data[key] != 0 && key != "notes") {
        issueArray.push({ issueName: key, issueNum: parseInt(data[key]) });
      }
    }

    let counter = 1;
    for (const key of Object.keys(data)) {
      if (data[key] == "") {
        //If the data value is empty
        if (key != "notes") {
          data[`issue_${counter}`] = 0;
          delete data[key];
          counter++;
        }
      } else {
        if (key != "notes") {
          data[`issue_${counter}`] = parseInt(data[key]);
          delete data[key];
          counter++;
        }
      }
    }
    data["notes"] == "" ? (data["notes"] = null) : (data["notes"] = notes);

    if (exists) {
      await update(`stats/weaponcontrols/issues/${compId}/${rowId}/`, data);
    } else {
      //Creates an object for Reports
      const reportObj = {
        key: new Date(),
        fName: fencerName,
        fNat: fencerNation,
        fIssues: issueArray,
        fNotes: data["notes"],
      };
      //If there would more than 3 it pops the last array element.
      if (wcReport.length >= 3) {
        setWcReport((current) => (current.slice(0, -1))); 
      }
      //Updates the array. The new element will be pushed to the first place. Aka. 0 index element.
      setWcReport((current) => [reportObj, ...current]);
      await post(`stats/weaponcontrols/issues/${compId}/${rowId}/`, data);
    }
    navigate(-1);
  };

  async function getData() {
    const data = await get(`stats/weaponcontrols/issues/${compId}/${rowId}/`);
    setExists(data.exists);

    let inputArray = [];

    let rowKey = 0;
    //Creates the issue rows
    for (const key of Object.keys(data)) {
      if (key == "notes") {
        data[key] == null ? setNotes("") : setNotes(data[key]);
        if(data[key] !== null){
          setValue("notes", data[key]);
        }
      }
      if (key == "fencer") {
        setFencerName(data[key].pre_nom + " " + data[key].nom);
        setFencerNation(data[key].nation);
      }

      if (key !== "exists" && key !== "notes" && key !== "fencer") {
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

  //Gets the issue datas from api
  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    const testIssues = issues.map((e)=>{
      
    })
  },[errors])


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
