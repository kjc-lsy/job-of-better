/*eslint-disable*/
import React, {useEffect, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
// nodejs library to set properties for components
import {PropTypes} from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import {getPrograms} from "../../apis/program"

// reactstrap components
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav} from "reactstrap";
import {BackgroundColorContext,} from "contexts/BackgroundColorWrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../contexts/AuthContextProvider";
import {useCurrProg} from "../../contexts/CurrProgProvider";

var ps;

function Sidebar(props) {
    const location = useLocation();
    const currentPath = location.pathname;
    const pathLayout = currentPath.split("/")[1];
    const {isLogin, roles, user} = useAuth();
    const sidebarRef = React.useRef(null);
    //const {programIdx,setProgramIdx} = useState(localStorage.getItem("program"));
    const [programList, setProgramList] = useState([
        {
            id: 1,
            pgIdx: 0,
            pgTitle: "",
            pgStatus: "",
        }
    ]);
    const [dropdownOpen, setDropdownOpen] = useState(false); // 도메인 토글용
    const {routes, rtlActive, logo} = props;
    const routeAllCate = [...new Set(routes.map(route => route.cate))];
    const routeExistingCate = [...new Set(routeAllCate.filter(cate => cate))];
    const [routeState, setRouteState] = useState();
    const {currProg, setCurrProg} = useCurrProg();
    const [selectedProgramTitle, setSelectedProgramTitle] = useState("프로그램 선택");

    useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(sidebarRef.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
        };
    });

    useEffect(() => {
        const selectedProgram = programList.find(item => item.pgIdx === currProg);
        setSelectedProgramTitle(selectedProgram ? selectedProgram.pgTitle : "프로그램 선택");
    }, [currProg, programList]);

    useEffect(() => {
        if(roles.company) {
            getProgramList()
            
            const storedProgIdx = localStorage.getItem("program");
            if (storedProgIdx) {
                setCurrProg(parseInt(storedProgIdx, 10));
            }
        }
    }, []);

    // 유저 상태별 사이드바 렌더링
    useEffect(() => {
        if(roles?.user && user?.pgRegStatus === "Approved") {
            setRouteState(routeExistingCate)
        }

        if(roles?.user && !(user?.pgRegStatus === "Approved")) {
            setRouteState([""])
        }

        if(roles?.company) {
            setRouteState(routeAllCate)
        }

    }, [user]);

    const activeRoute = (routeName) => {
        return location.pathname === routeName ? "active" : "";
    };

    const getProgramList = async () => {
        const response = await getPrograms();
        setProgramList(
            response.data.map((item, index) => {
                return {
                    id: index + 1,
                    pgIdx: item.pgIdx,
                    pgTitle: item.pgTitle,
                    pgStatus: item.pgStatus,
                };
            })
        )
    }

    const linkOnClick = () => {
        document.documentElement.classList.remove("nav-open");
    };

    function renderRoutesCategory(prop, key, depth) {
        return (
            <li
                className={activeRoute(prop.path) + (prop.pro ? " active-pro" : "") + (depth === 1 ? "depth1" : "depth2")}
                key={key}
            >
                <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    onClick={props.toggleSidebar}
                >
                    <i className={prop.icon}/>
                    <p>{rtlActive ? prop.rtlName : prop.name}</p>
                </NavLink>
            </li>
        );
    }

    // 로고 설정
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
        if (logo.outterLink !== undefined) {
            logoImg = (
                <a
                    href={logo.outterLink}
                    className="simple-text logo-mini"
                    target="_blank"
                    onClick={props.toggleSidebar}
                >
                    <div className="logo-img">
                        <img src={logo.imgSrc} alt="react-logo"/>
                    </div>
                </a>
            );
            logoText = (
                <a
                    href={logo.outterLink}
                    className="simple-text logo-normal"
                    target="_blank"
                    onClick={props.toggleSidebar}
                >
                    {logo.text}
                </a>
            );
        } else {
            logoImg = (
                <Link
                    to={logo.innerLink}
                    className="simple-text logo-mini"
                    onClick={props.toggleSidebar}
                >
                    <div className="logo-img">
                        <img src={logo.imgSrc} alt="react-logo"/>
                    </div>
                </Link>
            );
            logoText = (
                <Link
                    to={logo.innerLink}
                    className="simple-text logo-normal"
                    onClick={props.toggleSidebar}
                >
                    {logo.text}
                </Link>
            );
        }
    }

    return (
        <BackgroundColorContext.Consumer>
            {({color}) => (
                <div className="sidebar" data={color}>
                    <div className="sidebar-wrapper" ref={sidebarRef}>
                        {/*{logoImg !== null || logoText !== null
                            ?
                            (<div className="logo">
                                {logoImg}
                                {logoText}
                            </div>)
                            :
                            null}*/}
                        {pathLayout === "company" ?
                            <ButtonDropdown className="programSelector" isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                                <DropdownToggle caret className="domainSelect">
                                    <div>{selectedProgramTitle}</div>
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    {programList.map((item, index) => (
                                        <DropdownItem
                                            key={index}
                                            className={item.pgStatus === "Prestart" || item.pgStatus === "Ended" ? "grey" : ""}
                                            onClick={() => {
                                                localStorage.setItem("program", item.pgIdx);
                                                setCurrProg(item.pgIdx);
                                            }}>
                                            {item.pgTitle}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </ButtonDropdown>
                            :
                            null
                        }
                        <Nav>
                            {routeState?.map((item, index) => {
                                if (!item) {
                                    return routes.map((prop, key) => {
                                        if (prop.cate === item) {
                                            return renderRoutesCategory(prop, key, 1);
                                        }
                                    })
                                }

                                if (item){
                                    return (
                                        <li key={index}>
                                            <div
                                                className="navSubTit">{/*<i className={routes.filter(prop => prop.cate === item)[0].icon}></i>*/}{item}</div>
                                            <ul>
                                                {routes.map((prop, key) => {
                                                    if (prop.cate === item) {
                                                        return renderRoutesCategory(prop, key, 2)
                                                    }
                                                })}
                                            </ul>
                                        </li>
                                    );
                                }
                            })}
                        </Nav>;

                    </div>
                </div>
            )}
        </BackgroundColorContext.Consumer>
    );
}

Sidebar.propTypes = {
    // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
    // insde the links of this component
    rtlActive: PropTypes.bool,
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the text of the logo
        text: PropTypes.node,
        // the image src of the logo
        imgSrc: PropTypes.string,
    }),
};

export default Sidebar;
