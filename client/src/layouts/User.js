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
import React, {useEffect} from "react";
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
        if (!isLogin) { //contextProvider의 useEffect에 걸린 info()는 비동기 이기 때문에 isLogin이 업데이트 되는게 늦음.. 상태 업데이트가 되면 통과하도록 코딩
            return
        }

        if (!isLogin || !roles.isUser) {
            navigate("/auth/login")
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
