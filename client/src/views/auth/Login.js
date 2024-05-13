// reactstrap components
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row,} from "reactstrap";
import {useAuth} from "../../contexts/AuthContextProvider";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const {login, user, isLogin} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setRememberMe(localStorage.getItem("rememberMe") === "true");
    }, []);

    useEffect(() => {
        if (rememberMe === true) {
            setUsername(localStorage.getItem("username"));
        }
    }, [rememberMe]);

    // useEffect(() => {
    //     if (user?.pgRegStatus === "Pending") {
    //         navigate("/user/program")
    //     }
    //
    //     if (user?.pgRegStatus === "Registered") {
    //         navigate("/user/waiting-reg")
    //     }
    // }, [isLogin]);

    const loginSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    const handleRememberMe = (e) => {
        const isChecked = e.target.checked;
        setRememberMe(isChecked);

        if(isChecked) {
            localStorage.setItem("username", username);
            localStorage.setItem("rememberMe", isChecked);
        }else {
            localStorage.removeItem("username");
            localStorage.removeItem("rememberMe");
        }
    };

    return (
        <Col lg="5" md="7">
            <Card>
                <CardHeader className="text-center">
                    <h3 className="title">로그인</h3>
                </CardHeader>
                <CardBody>
                    <Form role="form" onSubmit={loginSubmit}>
                        <FormGroup>
                            <label>아이디</label>
                            <Input
                                placeholder="아이디"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>비밀번호</label>
                            <Input
                                placeholder="비밀번호"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                                className="custom-control-input"
                                id="customCheckLogin"
                                type="checkbox"
                                value={rememberMe}
                                onChange={handleRememberMe}
                                checked={rememberMe}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="customCheckLogin"
                            >
                                <span className="text-muted">Remember me</span>
                            </label>
                        </div>
                        <div className="text-center">
                            <Button className="my-4" color="primary" type="submit">
                                Sign in
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            <Row className="mt-3">
                <Col className="text-right" xs="12">
                    <a
                        className="text-light"
                        href="/auth/register-choice"
                    >
                        <small>Create new account</small>
                    </a>
                </Col>
            </Row>
        </Col>
    );
};

export default Login;
