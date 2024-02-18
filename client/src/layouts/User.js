/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
import {useLocation, Route, Routes, Navigate, useNavigate} from "react-router-dom";
// reactstrap components
import {Container} from "reactstrap";
// core components
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import UserNavbar from "../components/Navbars/UserNavbar";
import {useAuth} from "../contexts/AuthContextProvider";

const User = (props) => {
    const mainContent = React.useRef(null);
    const [isMounted, setIsMounted] = useState(false)
    const location = useLocation();
    const {isLogin, roles} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    // 권한 처리
    useEffect(() => {
        if(isMounted) {
            if (!isLogin || !roles.isUser) {
                alert("접근할 수 없습니다")
                navigate("/auth/login")
            }
        }else {
            setIsMounted(true) // 최초 마운트시에 한번은 이 useEffect가 실행되지 않음 아직 roles가 업데이트 되지 않았기 때문, contextProvider에서 isLogin, roles를 업데이트 하는 요청이 비동기이기 때문에 해당 값이 변경 될때만 실행 되도록 함
        }

    }, [isLogin, roles]);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/user") {
                return (
                    <Route path={prop.path} element={prop.component} key={key} exact/>
                );
            } else {
                return null;
            }
        });
    };

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (
                props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
                -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <>
            <Sidebar
                {...props}
                routes={routes}
                logo={{
                    innerLink: "/user/home",
                    imgSrc: require("../assets/img/brand/argon-react.png"),
                    imgAlt: "...",
                }}
            />
            <div className="main-content" ref={mainContent}>
                <UserNavbar
                    {...props}
                    brandText={getBrandText(props?.location?.pathname)}
                />
                <Routes>
                    {getRoutes(routes)}
                    <Route path="*" element={<Navigate to="/user/home" replace/>}/>
                </Routes>
                <Container fluid>
                    <AdminFooter/>
                </Container>
            </div>
        </>
    );
};

export default User;
