import {Navigate, Route, Routes} from "react-router-dom";
import CompanyLayout from "./layouts/Company";
import AuthLayout from "./layouts/Auth";
import UserLayout from "./layouts/User";
import React from "react";
import Loading from "./components/Loading";
import {useLoading} from "./contexts/LoadingProvider";
import {useAuth} from "./contexts/AuthContextProvider";

const App = () => {
    const {loading} = useLoading();
    const {isLogin} = useAuth();

    return (
        <>
            <Loading loading={loading}/>
            <Routes>
                <Route path="/auth/*" element={<AuthLayout/>}/>
                <Route path="/company/*" element={isLogin ? <CompanyLayout/> : <Navigate to="/auth/login" replace/>}/>
                <Route path="/user/*" element={isLogin ? <UserLayout/> : <Navigate to="/auth/login" replace/>}/>
                <Route path="*" element={<Navigate to="/auth/login" replace/>}/>
            </Routes>
        </>
    )
}
export default App