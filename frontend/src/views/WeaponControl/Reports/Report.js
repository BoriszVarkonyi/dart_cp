import React from "react";

export default function Report(props){
    const reportProps = props.props
    return(
        <div style={{padding: "30px"}}>
            <p>Name: {reportProps.fName}</p>
            <p>Nat:  {reportProps.fNat}</p>
            <p>Notes:  {reportProps.fNotes}</p>
            {reportProps.fIssues.map((e)=><p key={e.issueName}>Issue: {e.issueName}  Value: {e.issueNum}</p>)}

        </div>
    )
}