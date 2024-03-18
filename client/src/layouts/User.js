import React, {useEffect} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";

// core components
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";
import {BackgroundColorContext} from "contexts/BackgroundColorWrapper";
import {useAuth} from "../contexts/AuthContextProvider";
import CommonNavbar from "../components/Navbars/Navbar";
import Footer from "../components/Footer/Footer";

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
        if (isMounted) {
            if (!isLogin || !roles.isUser) {
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
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <BackgroundColorContext.Consumer>
            {({color, changeColor}) => (
                <React.Fragment>
                    <div className={"wrapper " + getBrandText(location.pathname) + "_wrapper"}>
                        <Sidebar
                            routes={userRoutes}
                            logo={{
                                outterLink: "/",
                                text: "Member",
                                imgSrc: logo,
                            }}
                            toggleSidebar={toggleSidebar}
                        />
                        <div className="main-panel" ref={mainPanelRef} data={color}>
                            <CommonNavbar
                                brandText={getBrandText(location.pathname)}
                                toggleSidebar={toggleSidebar}
                                sidebarOpened={sidebarOpened}
                                changeColor={changeColor}
                                sideColor={color}
                            />
                            <Routes>
                                {getRoutes(routes)}
                                <Route
                                    path="/"
                                    element={<Navigate to="/user/home" replace/>}
                                />
                            </Routes>
                            {
                                // we don't want the Footer to be rendered on map page
                                location.pathname === "/company/map" ? null : <Footer fluid/>
                            }
                        </div>
                    </div>
                </React.Fragment>
            )}
        </BackgroundColorContext.Consumer>
    );
}

export default User;
