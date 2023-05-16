import React, { useEffect } from "react";
import { TextField } from "@mui/material";

export default function Issue(props) {

  function focusHelper(e){
    if(e.target.value == 0){
      e.target.value = ""
    }
  }

  function blurHelper(e){
    if(e.target.value == ""){
      e.target.value = 0
    }
  }

  return (
    <tr key={props.rowKey}>
      <td>{props.issueName}</td>
      <td>
        <TextField
          error={!!props.errors[props.issueName]}
          helperText={props.errors[props.issueName]?.message}
          type="text"
          inputMode="numeric"
          size="small"
          defaultValue={props.issueNum} //Math.round((Math.random()*4)) use it to generate random values for test
          onFocus={(e)=>focusHelper(e)}
          onBlurCapture={(e)=>blurHelper(e)}
          {...props.register(props.issueName, {
            onChange: (e) => {
              if(e.target.value !="" && !e.target.value[e.target.value.length-1].match(/^[0-9]+$/s)){
                e.target.value = e.target.value.slice(0, -1)
              }
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "Please enter only numbers!",
            },
            max: {
              value: 10,
              message: "Please enter a number below nine!",
            },
            min: {
              value: 0,
              message: "Please enter a number above zero!",
            },
          })}
        />
      </td>
    </tr>
  );
}
