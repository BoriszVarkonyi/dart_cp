import React from "react";

function generateThrow(){
}

export default function PrintTable(props){
    const fields = props.col.map((e)=>e.field)
    console.log(fields)


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
                    {props.row.map((e)=>{
                        return (
                            <tr>
                                {fields.map((f)=>{
                                    return(
                                        <td>{e[f]}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
            </tbody>

        </table>
    )
}