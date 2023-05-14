import React from "react";

export default function Report(props) {
    const reportProps = props.props
    return (
        <div className="ReportCard">
            <div className="CardName">
                <p>{reportProps.fName}</p>
                <p>{reportProps.fNat}</p>
            </div>
            <div className="CardNotes">
                <p>Notes:</p>
                <p>{reportProps.fNotes}</p>
            </div>
            <div className="CardIssues">
                {reportProps.fIssues.map((e) => <p key={e.issueName}>Issue: {e.issueName}  Value: {e.issueNum}</p>)}
            </div>
        </div>
    )
}