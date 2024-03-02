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
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import {useAuth} from "../contexts/AuthContextProvider";

var ps;

function Admin(props) {
    const location = useLocation();
    const mainPanelRef = React.useRef(null);
    const {isLogin, roles} = useAuth();
    const navigate = useNavigate();

    useEffect(() => { // Auth 컴포넌트에 접근할때 무조건 한번은 실행됨(로그인 이후에 이 페이지 접근 불가)
        if (isLogin) {
            if (roles.isAdmin) {
                navigate("/admin");
                return
            }
            if (roles.isUser) {
                navigate("/user");
                return
            }
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
                            routes={routes}
                            logo={{
                                outterLink: "https://www.creative-tim.com/",
                                text: "Creative Tim",
                                imgSrc: logo,
                            }}
                            toggleSidebar={toggleSidebar}
                        />
                        <div className="main-panel" ref={mainPanelRef} data={color}>
                            <AdminNavbar
                                brandText={getBrandText(location.pathname)}
                                toggleSidebar={toggleSidebar}
                                sidebarOpened={sidebarOpened}
                            />
                            <Routes>
                                {getRoutes(routes)}
                                <Route
                                    path="/"
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

export default Admin;
