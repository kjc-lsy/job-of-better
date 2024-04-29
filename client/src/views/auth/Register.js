// reactstrap components
import {Button, Card, CardBody, CardHeader, Col, Form, Row,} from "reactstrap";
import React, {useState} from "react";
import * as auth from '../../apis/auth';
import {useNavigate} from "react-router-dom";
import UsernameFormGroup from "../../components/FormGroup/UsernameFormGroup";
import PasswordFormGroup from "../../components/FormGroup/PasswordFormGroup";
import CheckPasswordFormGroup from "../../components/FormGroup/CheckPasswordFormGroup";
import NameFormGroup from "../../components/FormGroup/NameFormGroup";
import EmailFormGroup from "../../components/FormGroup/EmailFormGroup";
import BirthDateFormGroup from "../../components/FormGroup/BirthDateFormGroup";
import PhoneFormGroup from "../../components/FormGroup/PhoneFormGroup";
import GenderFormGroup from "../../components/FormGroup/GenderFormGroup";
import RegisterAddrFormGroup from "../../components/FormGroup/RegisterAddrFormGroup";
import {useAlert} from "../../components/Alert/useAlert";

const Register = ({header}) => {
    const navigate = useNavigate();
    const sendAlert = useAlert();
    const [inputValue, setInputValue] = useState({
        username: "",
        validUsername: false,
        validDuplicateUsername: "",

        password: "",
        validPassword: false,
        checkPassword: "",
        validCheckPassword: false,

        name: "",
        validName: false,

        email: "",
        validEmail: false,
        emailUserName: "",
        domain: "",

        address: "",
        detailAddr : "",
        zipCode: "",

        birthDate: "",

        phone: "",
        validPhone: false,

        gender: "m",

        agree: false
    });

    const submitRequirement = inputValue.validUsername &&
        inputValue.validCheckPassword &&
        inputValue.validPassword &&
        inputValue.validName &&
        inputValue.validEmail &&
        inputValue.birthDate !== "" &&
        inputValue.validPhone &&
        inputValue.gender !== "" &&
        inputValue.agree;

    const handleJoin = async (e) => {
        e.preventDefault()
        auth.join(inputValue)
            .then(response => {
                navigate('/auth/login')
                sendAlert("error", '회원가입 성공! 로그인 해주세요')
            })
            .catch(error => {
                sendAlert("error", error.response.data);
            });
    }

    return (
        <Col lg="6" md="8" className="register-container">
            <Card>
                <CardBody>
                    <Form role="form" className="form-register" onSubmit={handleJoin}>
                        <CardHeader className="text-center">
                            <h3 className="title">개인 회원 가입</h3>
                        </CardHeader>
                        <UsernameFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <PasswordFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <CheckPasswordFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <NameFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <EmailFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <BirthDateFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <PhoneFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <RegisterAddrFormGroup
                            label="개인 주소"
                            placeholder="상세주소"
                            handleDetailAddrValue={(value) => setInputValue({...inputValue, detailAddr: value})}
                            handleAddrValue={(value) => setInputValue({...inputValue, address: value})}
                            handleZipCodeValue={(value) => setInputValue({...inputValue, zipCode: value})}
                        />
                        <GenderFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <Row className="my-4">
                            <Col xs="12">
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                        className="custom-control-input"
                                        id="customCheckRegister"
                                        type="checkbox"
                                        name="agree"
                                        onChange={(e) => setInputValue({...inputValue, agree: !inputValue.agree})}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customCheckRegister"
                                    >
                                      <span className="text-muted">
                                        I agree with the{" "}
                                          <a href="#pablo" onClick={e => e.preventDefault()}>
                                          Privacy Policy
                                        </a>
                                      </span>
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="my-4" color="primary" type="submit" disabled={!submitRequirement}>
                                회원가입
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Register;
