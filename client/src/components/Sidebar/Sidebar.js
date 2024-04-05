/*eslint-disable*/
import React from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
// nodejs library to set properties for components
import {PropTypes} from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import {Nav} from "reactstrap";
import {BackgroundColorContext,} from "contexts/BackgroundColorWrapper";

var ps;

function Sidebar(props) {

    const location = useLocation();
    const currentPath = location.pathname;
    const sidebarRef = React.useRef(null);

    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return location.pathname === routeName ? "active" : "";
    };

    React.useEffect(() => {
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

    const linkOnClick = () => {
        document.documentElement.classList.remove("nav-open");
    };

    const {routes, rtlActive, logo} = props;

    const dupArr = routes.map(route => route.cate);
    const routeArr = dupArr.filter((element, index) => {
        return dupArr.indexOf(element) === index;
    });
    function renderRoutesCategory(prop, key,depth) {
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
                        {logoImg !== null || logoText !== null
                            ?
                            (<div className="logo">
                                {logoImg}
                                {logoText}
                            </div>)
                            :
                            null}
                        <Nav>
                            {routeArr.map((item, index) => {
                                if (item === "" || item === null || item === undefined) {
                                    return routes.map((prop, key) => {
                                        if (prop.cate === item) {
                                            return renderRoutesCategory(prop, key, 1);
                                        } })} else {
                                    return (
                                        <li key={index}>
                                            <div className="navSubTit">{/*<i className={routes.filter(prop => prop.cate === item)[0].icon}></i>*/}{item}</div>
                                            <ul>
                                                {routes.map((prop, key) => {
                                                    if (prop.cate === item) {
                                                       return renderRoutesCategory(prop, key,2)}})}
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
