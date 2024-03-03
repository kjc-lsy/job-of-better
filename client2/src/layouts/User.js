/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect} from "react";
import {Route, Routes, Navigate, useLocation, useNavigate} from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import UserNavbar from "components/Navbars/UserNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import {useAuth} from "../contexts/AuthContextProvider";

var ps;

function User(props) {
    const location = useLocation();
    const mainPanelRef = React.useRef(null);
    const {isLogin, roles} = useAuth();
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = React.useState(false);
    const userRoutes = routes.filter(route => route.layout === "/user");

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

    const [sidebarOpened, setsidebarOpened] = React.useState(
        document.documentElement.className.indexOf("nav-open") !== -1
    );
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            document.documentElement.className += " perfect-scrollbar-on";
            document.documentElement.classList.remove("perfect-scrollbar-off");
            ps = new PerfectScrollbar(mainPanelRef.current, {
                suppressScrollX: true,
            });
            let tables = document.querySelectorAll(".table-responsive");
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i]);
            }
        }
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
                document.documentElement.classList.add("perfect-scrollbar-off");
                document.documentElement.classList.remove("perfect-scrollbar-on");
            }
        };
    });
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            let tables = document.querySelectorAll(".table-responsive");
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i]);
            }
        }
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        if (mainPanelRef.current) {
            mainPanelRef.current.scrollTop = 0;
        }
    }, [location]);
    // this function opens and closes the sidebar on small devices
    const toggleSidebar = () => {
        document.documentElement.classList.toggle("nav-open");
        setsidebarOpened(!sidebarOpened);
    };
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/user") {
                return (
                    <Route path={prop.path} element={prop.component} key={key} exact />
                );
            } else {
                return null;
            }
        });
    };


    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <BackgroundColorContext.Consumer>
            {({ color, changeColor }) => (
                <React.Fragment>
                    <div className="wrapper">
                        <Sidebar
                            routes={userRoutes}
                            logo={{
                                outterLink: "https://www.creative-tim.com/",
                                text: "Creative Tim",
                                imgSrc: logo,
                            }}
                            toggleSidebar={toggleSidebar}
                        />
                        <div className="main-panel" ref={mainPanelRef} data={color}>
                            <UserNavbar
                                brandText={getBrandText(location.pathname)}
                                toggleSidebar={toggleSidebar}
                                sidebarOpened={sidebarOpened}
                            />
                            <Routes>
                                {getRoutes(routes)}
                                <Route
                                    path="*"
                                    element={<Navigate to="/user/home" replace />}
                                />
                            </Routes>
                        </div>
                    </div>
                    <FixedPlugin bgColor={color} handleBgClick={changeColor} />
                </React.Fragment>
            )}
        </BackgroundColorContext.Consumer>
    );
}

export default User;
