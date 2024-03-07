import {Navigate, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import UserLayout from "./layouts/User";
import React, {useEffect, useState} from "react";

import {ThemeProvider} from "styled-components";
import {primary, green, pink} from "./theme/theme";
import GlobalStyle from "./theme/GlobalStyle";

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