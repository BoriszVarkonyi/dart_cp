import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false
}

const load = createSlice({
    name:"isLoading",
    initialState,
    reducers:{
        setIsLoading: (state, {payload}) =>{

            state.isLoading = payload
        },
    }
})


export const {setIsLoading} = load.actions

export default load.reducer