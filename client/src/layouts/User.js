import React, {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";

// core components
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";
import {BackgroundColorContext} from "contexts/BackgroundColorWrapper";
import {useAuth} from "../contexts/AuthContextProvider";
import CommonNavbar from "../components/Navbars/Navbar";
import Footer from "../components/Footer/Footer";

import {getBrandText, getPathname, getRoutes} from "../components/GetRouteProvider";
import ProgramInfo from "../views/user/program/ProgramInfo";
import WaitingReg from "../views/user/WaitingReg";
import {useLoading} from "../contexts/LoadingProvider";
import withAuthorization from "../components/HOC/withAuthorization";

var ps;

function User(props) {
    const location = useLocation();
    const mainPanelRef = React.useRef(null);
    const {isLogin, user} = useAuth();
    const navigate = useNavigate();
    const userRoutes = routes.filter(route => route.layout === "/user");
    const {setLoading} = useLoading();

    // 권한 처리
    useEffect(() => {
        setLoading(true)

        if(isLogin) {
            setLoading(false)

            if(!user.pgRegStatus) {
                navigate("/user/program")
            }

            if(user.pgRegStatus === "Pending") {
                navigate("/user/waiting-reg")
            }

            if(user.pgRegStatus === "Approved") {
                navigate("/user/user-profile")
            }

        }
    }, [isLogin, user.pgRegStatus]);

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

    return (
        <BackgroundColorContext.Consumer>
            {({color, changeColor}) => (
                <div className={"wrapper " + getPathname(location) + "-wrapper"}>
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
                            brandText={getBrandText(location)}
                            toggleSidebar={toggleSidebar}
                            sidebarOpened={sidebarOpened}
                            changeColor={changeColor}
                            sideColor={color}
                        />
                        <Routes>
                            {getRoutes(routes, location)}
                            <Route
                                path="/waiting-reg"
                                element={<WaitingReg/>}
                            />
                            <Route
                                path="/program-info/:pgIdx"
                                element={<ProgramInfo/>}
                            />
                            <Route path="/" element={<></>} />
                        </Routes>
                        {
                            // we don't want the Footer to be rendered on map page
                            location.pathname === "/company/map" ? null : <Footer fluid/>
                        }
                    </div>
                </div>
            )}
        </BackgroundColorContext.Consumer>
    );
}

export default withAuthorization(User, ['user','company']);
