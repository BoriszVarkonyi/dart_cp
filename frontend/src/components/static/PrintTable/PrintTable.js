import React from "react";

export default function PrintTable(props) {
  const fields = props.col.map((e) => e.field);

  const sortedCompArray = [...props.row].sort((a, b) => {
    return b[props.sorting.field] - a[props.sorting.field];
  });

  return (
    <table>
      <thead>
        <tr>
          {props.col.map((e) => {
            return <th key={e.field}>{e.headerName}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {sortedCompArray.map((obj) => {
          return (
            <tr>
              {fields.map((field) => {
                return <td>{obj[field]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
