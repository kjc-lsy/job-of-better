// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import {useAuth} from "../contexts/AuthContextProvider";
import React, {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();

    const loginSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
    }

    return (
        <>
            <Col lg="5" md="7">

                <Card>
                    <CardHeader className="text-center">
                        <h3 className="title">로그인</h3>
                    </CardHeader>
                    {/*className="bg-secondary shadow border-0"*/}
                {/*    <CardHeader className="bg-transparent pb-5">*/}
                {/*        <div className="text-muted text-center mt-2 mb-3">*/}
                {/*            <small>Sign in with</small>*/}
                {/*        </div>*/}
                {/*        <div className="btn-wrapper text-center">*/}
                {/*            <Button*/}
                {/*                className="btn-neutral btn-icon"*/}
                {/*                color="default"*/}
                {/*                href="#pablo"*/}
                {/*                onClick={(e) => e.preventDefault()}*/}
                {/*            >*/}
                {/*<span className="btn-inner--icon">*/}
                {/*  <img*/}
                {/*      alt="..."*/}
                {/*      src={*/}
                {/*          require("../../assets/img/icons/common/github.svg")*/}
                {/*              .default*/}
                {/*      }*/}
                {/*  />*/}
                {/*</span>*/}
                {/*                <span className="btn-inner--text">Github</span>*/}
                {/*            </Button>*/}
                {/*            <Button*/}
                {/*                className="btn-neutral btn-icon"*/}
                {/*                color="default"*/}
                {/*                href="#pablo"*/}
                {/*                onClick={(e) => e.preventDefault()}*/}
                {/*            >*/}
                {/*<span className="btn-inner--icon">*/}
                {/*  <img*/}
                {/*      alt="..."*/}
                {/*      src={*/}
                {/*          require("../../assets/img/icons/common/google.svg")*/}
                {/*              .default*/}
                {/*      }*/}
                {/*  />*/}
                {/*</span>*/}
                {/*                <span className="btn-inner--text">Google</span>*/}
                {/*            </Button>*/}
                {/*        </div>*/}
                {/*    </CardHeader>*/}
                    <CardBody>
                        {/*<div className="text-center text-muted mb-4">
                            <small>로그인을 위해 정보를 입력해주세요</small>
                        </div>*/}
                        <Form role="form" onSubmit={loginSubmit}>
                            {/*<FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="아이디"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>*/}
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
                            {/*<FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="비밀번호"
                                        type="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>*/}
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                    className="custom-control-input"
                                    id=" customCheckLogin"
                                    type="checkbox"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor=" customCheckLogin"
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
                    <Col xs="6">
                        <a
                            className="text-light"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <a
                            className="text-light"
                            href="/auth/register"
                        >
                            <small>Create new account</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default Login;
