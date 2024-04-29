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
import React from "react";
import themeImg from '../../assets/img/theme.png';
import {FormGroup, Input, InputGroup,Label} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon ,faBrush} from '@fortawesome/free-solid-svg-icons'
/*import {fas} from '@fortawesome/free-solid-svg-icons'*/

// reactstrap components
import {Dropdown, DropdownToggle, Badge} from "reactstrap";
import {ThemeContext, themes} from "contexts/ThemeWrapper";
import {backgroundColors} from "contexts/BackgroundColorWrapper";

function FixedPlugin(props) {
    const [dropDownIsOpen, setdropDownIsOpen] = React.useState(false);
    const [toggleTheme, setToggleTheme] = React.useState(true);
    const handleClick = (color) => {
        setdropDownIsOpen(!dropDownIsOpen);
    };

    return (
        <div className="fixed-plugin">
            <ThemeContext.Consumer>
                {({changeTheme, theme}) => (
                    <Dropdown isOpen={dropDownIsOpen} toggle={handleClick}>
                        <DropdownToggle tag="div">
                            {/*<FontAwesomeIcon icon={faBrush} color={theme === themes.light ? "#525f7f":"#fff"} size="xl" className="themeToggleBtn" />*/}
                            {/*<img src={theme === themes.dark ? themeImg : themeImg} alt="theme toggle"/>*/}
                            {/*<i className="fa fa-cog fa-2x"/>*/}
                            <i className="tim-icons icon-settings-gear-63"/>
                        </DropdownToggle>
                        <ul className="dropdown-menu show">
                            <li className="header-title">SITE THEME</li>
                            <li className="adjustments-line text-center color-change">

                                <div className={theme === themes.dark ? "active changeThemeWrap":"changeThemeWrap"} >
                                    <FontAwesomeIcon size="xl" icon={faSun} color={theme === themes.light ? "#ffd20f":"#fff"} />
                                    <div
                                        id="themeSwitch"
                                        checked={toggleTheme}
                                        onClick={() => {
                                            changeTheme(toggleTheme ? themes.dark : themes.light);
                                            setToggleTheme(!toggleTheme);
                                        }}
                                    ><span></span></div>
                                    <FontAwesomeIcon size="xl" color={theme === themes.dark ? "#297eba":"#fff"} icon={faMoon}  />
                                </div>
                                {/*<span className="color-label">LIGHT MODE</span>{" "}
                                <Badge
                                    className={
                                        theme === themes.light ? "light-badge mr-2 active" : "light-badge mr-2"
                                    }
                                    onClick={() => changeTheme(themes.light)}
                                />{" "}
                                <Badge
                                    className={
                                        theme === themes.dark ? "dark-badge ml-2 active" : "dark-badge ml-2"
                                    }
                                    onClick={() => changeTheme(themes.dark)}
                                />{" "}
                                <span className="color-label">DARK MODE</span>*/}
                            </li>
                            <li className="header-title">SIDEBAR BACKGROUND</li>
                            <li className="adjustments-line">
                                <div className="badge-colors text-center">
                                    <Badge
                                        color="primary"
                                        className={
                                            props.sideColor === backgroundColors.primary ? "active" : ""
                                        }
                                        onClick={() => {
                                            //console.log(props.sideColor);
                                            props.handleBgClick(backgroundColors.primary);
                                            //localStorage.setItem("back-color", "primary");
                                        }}
                                    />{" "}
                                    <Badge
                                        className={
                                            props.sideColor === backgroundColors.pink ? "active pink" : "pink"
                                        }
                                        onClick={() => {
                                            props.handleBgClick(backgroundColors.pink);
                                            //localStorage.setItem("back-color", "pink");
                                        }}
                                    />{" "}
                                    <Badge
                                        color="success"
                                        className={
                                            props.sideColor === backgroundColors.green ? "active" : ""
                                        }
                                        onClick={() => {
                                            props.handleBgClick(backgroundColors.green);
                                            //localStorage.setItem("back-color", "green");
                                        }}
                                    />{" "}
                                </div>
                            </li>

                            {/*<li className="button-container">
                                  <Button
                                    href="https://www.creative-tim.com/product/black-dashboard-react"
                                    color="primary"
                                    block
                                    className="btn-round"
                                  >
                                    Download Now
                                  </Button>
                                  <Button
                                    color="default"
                                    block
                                    className="btn-round"
                                    outline
                                    href="https://demos.creative-tim.com/black-dashboard-react/#/documentation/tutorial"
                                  >
                                    Documentation
                                  </Button>
                                </li>
                                <li className="header-title">Want more components?</li>
                                <li className="button-container">
                                  <Button
                                    href="https://www.creative-tim.com/product/black-dashboard-pro-react"
                                    className="btn-round"
                                    disabled
                                    block
                                    color="danger"
                                  >
                                    Get pro version
                                  </Button>
                            </li>*/}

                        </ul>
                    </Dropdown>
                )}
            </ThemeContext.Consumer>
        </div>
    );
}

export default FixedPlugin;
