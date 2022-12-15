import { Route, Routes } from "react-router-dom";
import Competitions from "../../../views/Competition/Competitions"
import Timetable from "../../../views/Timetable/Timetable"
import Competitors from "../../../views/Competitor/Competitors"
import Registration from "../../../views/Registration/Registration"

export function ControlRoutes(){
    return(
        <Routes>
            <Route path="competitions" element={<Competitions/>}/>
            <Route path="timetable" element={<Timetable/>}/>
            <Route path="competitors" element={<Competitors/>}/>
            <Route path="registration" element={<Registration/>}/>
        </Routes>
    )
}