import React, {useEffect} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate,} from "react-router-dom";
import {Container, Row} from "reactstrap";
import CommonNavbar from "../components/Navbars/Navbar";
import "assets/scss/argon-dashboard-react.scss";
import {getBrandText, getPathname, getRoutes,} from "../components/GetRouteProvider";

import routes from "routes.js";
import {BackgroundColorContext} from "../contexts/BackgroundColorWrapper";
import {useAuth} from "../contexts/AuthContextProvider";

const Auth = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    const {isLogin, roles, user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Auth 컴포넌트에 접근할때 무조건 한번은 실행됨(로그인 이후에 이 페이지 접근 불가)
        if (isLogin) {
            if (roles.company) {
                navigate("/company");
                return;
            }
            if (roles.user) {
                navigate("/user");
                return;
            }
        }
    }, [isLogin]);

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

    return (
        <BackgroundColorContext.Consumer>
            {({color, changeColor}) => (
                <React.Fragment>
                    <CommonNavbar
                        brandText={getBrandText(location)}
                        changeColor={changeColor}
                        sideColor={color}
                    />
                    <div className={"wrapper " + getPathname(location) + "-wrapper"}>
                        <div
                            className="main-panel auth_wrap p-6"
                            ref={mainContent}
                            data={color}
                        >
                            <Container className="">
                                <Row className="justify-content-center">
                                    <Routes>
                                        {getRoutes(routes, location)}
                                        <Route
                                            path="*"
                                            element={<Navigate to="/auth/login" replace/>}
                                        />
                                    </Routes>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    {/*<FixedPlugin bgColor={color} handleBgClick={changeColor}/>*/}
                </React.Fragment>
            )}
        </BackgroundColorContext.Consumer>
    );
};

export default Auth;

