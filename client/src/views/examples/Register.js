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
    Col, Label,
} from "reactstrap";
import {useState} from "react";

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    return (
        <>
            <Col lg="6" md="8">
                <Card className="bg-secondary shadow border-0">
                    {/*<CardHeader className="bg-transparent pb-5">*/}
                    {/*    <div className="text-muted text-center mt-2 mb-4">*/}
                    {/*        <small>Sign up with</small>*/}
                    {/*    </div>*/}
                    {/*    <div className="text-center">*/}
                    {/*        <Button*/}
                    {/*            className="btn-neutral btn-icon mr-4"*/}
                    {/*            color="default"*/}
                    {/*            href="#pablo"*/}
                    {/*            onClick={(e) => e.preventDefault()}*/}
                    {/*        >*/}
                    {/*        <span className="btn-inner--icon">*/}
                    {/*          <img*/}
                    {/*              alt="..."*/}
                    {/*              src={*/}
                    {/*                  require("../../assets/img/icons/common/github.svg")*/}
                    {/*                      .default*/}
                    {/*              }*/}
                    {/*          />*/}
                    {/*        </span>*/}
                    {/*            <span className="btn-inner--text">Github</span>*/}
                    {/*        </Button>*/}
                    {/*        <Button*/}
                    {/*            className="btn-neutral btn-icon"*/}
                    {/*            color="default"*/}
                    {/*            href="#pablo"*/}
                    {/*            onClick={(e) => e.preventDefault()}*/}
                    {/*        >*/}
                    {/*        <span className="btn-inner--icon">*/}
                    {/*          <img*/}
                    {/*              alt="..."*/}
                    {/*              src={*/}
                    {/*                  require("../../assets/img/icons/common/google.svg")*/}
                    {/*                      .default*/}
                    {/*              }*/}
                    {/*          />*/}
                    {/*        </span>*/}
                    {/*            <span className="btn-inner--text">Google</span>*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*</CardHeader>*/}
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>회원가입을 위해 정보를 입력해주세요</small>
                        </div>
                        <Form role="form" className="form-register">
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        value={username}
                                        name="username"
                                        placeholder="아이디"
                                        type="text"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="text-muted font-italic">
                                <small>
                                    password strength:{" "}
                                    <span className="text-success font-weight-700">strong</span>
                                </small>
                            </div>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        value={password}
                                        placeholder="비밀번호"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-circle-08"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        value={name}
                                        name="name"
                                        placeholder="이름"
                                        type="text"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        vlaue={email}
                                        placeholder="이메일"
                                        name="email"
                                        type="email"
                                        autoComplete="new-email"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-calendar-grid-58"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        vlaue=""
                                        placeholder="생년월일"
                                        name="date placeholder"
                                        type="date"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-mobile-button"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        vlaue=""
                                        placeholder="휴대폰 번호"
                                        name="phone"
                                        type="text"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative bg-white"
                                            style={{color: "#8898aa"}}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-ui-04"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Col>
                                        <FormGroup check>
                                            <Label className="p-2 mb-0" style={{fontSize: "0.875rem"}}>
                                                <Input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                />남성
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup check>
                                            <Label className="p-2 mb-0" style={{fontSize: "0.875rem"}}>
                                                <Input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                />여성
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </InputGroup>
                            </FormGroup>
                            <Row className="my-4">
                                <Col xs="12">
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id="customCheckRegister"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheckRegister"
                                        >
                                      <span className="text-muted">
                                        I agree with the{" "}
                                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                          Privacy Policy
                                        </a>
                                      </span>
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <Button className="mt-4" color="primary" type="button">
                                    Create account
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Register;
