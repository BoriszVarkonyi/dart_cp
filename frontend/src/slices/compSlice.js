import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    competitions: []
}

const compSlice = createSlice({
    name:"competitions",
    initialState,
    reducers:{
        setCompetitions: (state, {payload}) =>{
            state.competitions = payload

        },
        deleteCompetition: (state, {payload}) =>{
            state.competitions = state.competitions.filter((item)=>item.id != payload)
        }
    }
})

export const {setCompetitions, deleteCompetition} = compSlice.actions

export default compSlice.reducer