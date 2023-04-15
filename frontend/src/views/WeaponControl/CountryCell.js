import React from "react";
import { DataGrid } from "@mui/x-data-grid";


export default function CountryCell(props){
  const prop = props.props
    return (
        <div className="CountryCell">
          <p className="CountryName">{prop.longName}</p>
          <div className="CountryData">
            <p>{prop.fencerNum} fencers</p>
            <b>{prop.issueNum} issues</b>
            <p>{prop.ratio} ratio</p>
          </div>
          <div className="CountryContent" style={{ height: "500px" }}>
            <DataGrid
              style={{ height: "100%", width: "100%" }}
              disableRowSelectionOnClick
              rows={prop.row}
              rowHeight={25}
              columns={prop.col}
              initialState={{
                sorting: {
                  sortModel: [{ field: "freq", sort: "desc" }],
                },
              }}
            />
          </div>
        </div>
      );
}