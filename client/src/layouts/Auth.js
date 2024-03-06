import React, {useEffect} from "react";
import {useLocation, Route, Routes, Navigate, useNavigate} from "react-router-dom";
import {Container, Row, Col, Navbar} from "reactstrap";
import CommonNavbar from "../components/Navbars/Navbar";
import "assets/scss/argon-dashboard-react.scss";

import routes from "routes.js";
import {BackgroundColorContext} from "../contexts/BackgroundColorContext";
import {useAuth} from "../contexts/AuthContextProvider";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";

const Auth = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();
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

    useEffect(() => {
        document.body.classList.add("bg-default");
        return () => {
            document.body.classList.remove("bg-default");
        };
    }, []);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <Route path={prop.path} element={prop.component} key={key} exact/>
                );
            } else {
                return null;
            }
        });
    };

    return (
        <BackgroundColorContext.Consumer>
            {({color, changeColor}) => (
                <React.Fragment>
                    <div className="wrapper">
                      <CommonNavbar/>
                        <div className="main-panel auth_wrap p-6" ref={mainContent} data={color}>
                            {/*<div className="main-content " ref={mainContent} data={color}>*/}

                            <div className="">
                                {/*
                            header py-7
                            <Container>
                              <div className="header-body text-center mb-7">
                                <Row className="justify-content-center">
                                  <Col lg="5" md="6">
                                    <h1>Welcome!</h1>
                                    <p className="text-lead text-light">
                                      학생들에게 보여줄 문구를 입력해주세요!!
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Container>*/}
                                                  {/*<div className="separator separator-bottom separator-skew zindex-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                              >
                                <polygon
                                  className="fill-default"
                                  points="2560 0 2560 100 0 100"
                                />
                              </svg>
                            </div>*/}
                            </div>
                            {/* Page content */}
                            <Container className="">
                                <Row className="justify-content-center">
                                    <Routes>
                                        {getRoutes(routes)}
                                        <Route path="*" element={<Navigate to="/auth/login" replace/>}/>
                                    </Routes>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    <FixedPlugin bgColor={color} handleBgClick={changeColor}/>
                </React.Fragment>
            )}
        </BackgroundColorContext.Consumer>
    );
};

export default Auth;