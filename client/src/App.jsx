import {Navigate, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import UserLayout from "./layouts/User";
import React from "react";
const App = () => {

    return (
        <>
            <Routes>
                <Route path="/admin/*" element={<AdminLayout/>}/>
                <Route path="/auth/*" element={<AuthLayout/>}/>
                <Route path="/user/*" element={<UserLayout/>}/>
                <Route path="*" element={<Navigate to="/auth/login" replace/>}/>
            </Routes>
        </>
    )
}
export default App