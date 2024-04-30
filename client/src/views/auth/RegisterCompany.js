// reactstrap components
import {Button, Card, CardBody, CardHeader, Col, Form, Row,} from "reactstrap";

import React, {useEffect, useState} from "react";
import * as auth from '../../apis/auth';
import {useNavigate} from "react-router-dom";
import BNoFormGroup from "../../components/FormGroup/BNoFormGroup";
import RegisterFileFormGroup from "../../components/FormGroup/RegisterFileFormGroup";
import ComNameFormGroup from "../../components/FormGroup/ComNameFormGroup";
import BTelFormGroup from "../../components/FormGroup/BTelFormGroup";
import RegisterAddrFormGroup from "../../components/FormGroup/RegisterAddrFormGroup";
import UsernameFormGroup from "../../components/FormGroup/UsernameFormGroup";
import PasswordFormGroup from "../../components/FormGroup/PasswordFormGroup";
import CheckPasswordFormGroup from "../../components/FormGroup/CheckPasswordFormGroup";
import NameFormGroup from "../../components/FormGroup/NameFormGroup";
import EmailFormGroup from "../../components/FormGroup/EmailFormGroup";
import BOpeningDateFormGroup from "../../components/FormGroup/BOpeningDateFormGroup";
import CeoNameFormGroup from "../../components/FormGroup/CeoNameFormGroup";
import PhoneFormGroup from "../../components/FormGroup/PhoneFormGroup";
import {useAlert} from "../../components/Alert/useAlert";

const CompanyRegister = () => {

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

        phone: "",
        validPhone: false,

        b_no: "",
        validBNo: "",
        validDuplicateBNo: "",
        b_name: "",
        b_ceoName: "",
        validBCeoName: false,
        b_img: "",
        b_tel: "",
        validBTel: false,
        b_address: "",
        b_detailAddr: "",
        b_zipCode: "",
        b_openingDate: new Date(),

        agree: false
    });

    const submitRequirement =
        Object.values(inputValue).every(value => value) &&
        inputValue?.validBNo === "true" &&
        inputValue?.validDuplicateBNo === "false" &&
        inputValue?.validBCeoName &&
        inputValue?.validUsername &&
        inputValue?.validDuplicateUsername === "true" &&
        inputValue?.validCheckPassword &&
        inputValue?.validPassword &&
        inputValue?.validName &&
        inputValue?.validEmail &&
        inputValue?.validPhone &&
        inputValue?.agree;

    useEffect(() => {
        console.log(inputValue);
    },[inputValue])

    // 회원가입
    const handleJoin = async (e) => {
        e.preventDefault()
        auth.companyJoin(inputValue)
            .then(response => {
                navigate('/auth/login')
                sendAlert("success", '회원가입 성공! 로그인 해주세요')
            })
            .catch(error => {
                console.log(error)
                sendAlert("error", error.response.data);
            });
    }

    return (
        <Col lg="6" md="8" className="register-container">
            <Card>
                <Form role="form" className="form-register" onSubmit={handleJoin}>
                    <CardBody>
                        <CardHeader className="text-center">
                            <h3 className="title">기업 회원 가입</h3>
                            <p>모든 정보를 입력 후 회원가입을 눌러주세요.</p>
                        </CardHeader>
                        <h4>기업 인증</h4>
                        <BNoFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <RegisterFileFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <ComNameFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <CeoNameFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <BTelFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <RegisterAddrFormGroup
                            label="기업 주소"
                            placeholder="상세 주소"
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            handleAddrValue={fullAddr => {
                                setInputValue({...inputValue, b_address: fullAddr})
                            }}
                            handleZipCodeValue={zipCode => {
                                setInputValue({...inputValue, b_zipCode: zipCode})
                            }}
                        />
                        <BOpeningDateFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                    </CardBody>
                    <CardBody>
                        <h4>담당자 정보</h4>
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
                        <PhoneFormGroup
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                    </CardBody>
                    <CardBody>
                        <h4>약관</h4>
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
                    </CardBody>
                </Form>
            </Card>
        </Col>
    );
};

export default CompanyRegister;
