import React from "react";

function generateThrow(){
}

export default function PrintTable(props){
    const fields = props.col.map((e)=>e.field)


    return(
        <table>
            <thead>
                <tr>
                    {props.col.map((e)=>{
                        return(
                            <th key={e.field}>{e.headerName}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                    {props.row.map((obj)=>{
                        return (
                            <tr>
                                {fields.map((field)=>{
                                    return(
                                        <td>{obj[field]}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
            </tbody>

        </table>
    )
}