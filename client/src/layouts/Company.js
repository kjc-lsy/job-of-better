import React, {useEffect} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import {getBrandText, getPathname, getRoutes} from "../components/GetRouteProvider";
// core components
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";
import {BackgroundColorContext} from "contexts/BackgroundColorWrapper";
import {useAuth} from "../contexts/AuthContextProvider";
import CommonNavbar from "../components/Navbars/Navbar";
import ProgramModify from "../views/company/program/ProgramModify";
import ProgramInfo from "../views/company/program/ProgramInfo";
import ProgramInsert from "../views/company/program/ProgramInsert";

var ps;

function Company(props) {
    const location = useLocation();
    const mainPanelRef = React.useRef(null);
    const {isLogin, roles} = useAuth();
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = React.useState(false);
    const companyRoutes = routes.filter(route => route.layout === "/company");

    // 권한 처리
    useEffect(() => {
        if (isMounted) {
            if (!isLogin || !roles.isCompany) {
                alert("접근할 수 없습니다")
                navigate("/auth/login")
            }
        } else {
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
    /*const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/company") {
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
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };
    const getPathname = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return (routes[i].path).slice(1);
            }
        }
        return "";
    };*/

    return (
        <BackgroundColorContext.Consumer>
            {({color, changeColor}) => (
                <div className={"wrapper " + getPathname(location) + "-wrapper"}>
                    <Sidebar
                        routes={companyRoutes}
                        logo={{
                            outterLink: "/",
                            text: "Company",
                            imgSrc: logo,
                        }}
                        toggleSidebar={toggleSidebar}
                    />
                    <div className="main-panel" ref={mainPanelRef} data={color}>
                        <CommonNavbar
                            brandText={getBrandText(location)}
                            toggleSidebar={toggleSidebar}
                            sidebarOpened={sidebarOpened}
                            changeColor={changeColor}
                            sideColor={color}
                        />
                        <Routes>
                            {getRoutes(routes, location)}
                            <Route
                                path="/program-info/:pgIdx"
                                element={<ProgramInfo/>}
                            />
                            <Route
                                path="/program-modify/:pgIdx"
                                element={<ProgramModify/>}
                            />
                            <Route
                                path="/program-insert"
                                element={<ProgramInsert/>}
                            />
                            <Route
                                path="/"
                                element={<Navigate to="/company/home" replace/>}
                            />
                        </Routes>
                        {
                            location.pathname === "/company/map" ? null : <Footer fluid/>
                        }
                    </div>
                </div>
            )}
        </BackgroundColorContext.Consumer>
    );
}

export default Company;
