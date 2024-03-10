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
    Col, Label, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu,
} from "reactstrap";
import React, {useEffect, useState} from "react";
import * as auth from '../../apis/auth';
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: "",
        validUsername: false,

        password: "",
        validPassword: false,
        checkPassword: "",
        validCheckPassword: false,

        name: "",
        validName: false,

        email: "",
        validEmail: false,
        emailUserName: "",
        domain:"",

        birthDate: "",

        phone: "",
        validPhone: false,

        gender: "",

        agree: false
    });

    // 유효성 검사를 위한 regex
    const inputRegexs = {
        // 아이디 : 문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 5~20자 이내
        usernameRegex: /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/,
        // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
        pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
        // 닉네임 : 영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내
        nameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
        phoneRegex: /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/,
        emailRegex: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/,
    };

    const submitRequirement = inputValue.validUsername &&
        inputValue.validCheckPassword &&
        inputValue.validPassword &&
        inputValue.validName &&
        inputValue.validEmail &&
        inputValue.birthDate !== "" &&
        inputValue.validPhone &&
        inputValue.gender !== "" &&
        inputValue.agree;

    const [dropdownOpen, setDropdownOpen] = useState(false); // 도메인 토글용
    const [isReadOnly, setIsReadOnly] = useState(true); // 도메인 입력란의 readOnly 상태 관리를 위한 새로운 상태 변수

    useEffect(()=>{
        if(RegExp(inputRegexs.usernameRegex).exec(inputValue.username)){
            setInputValue({...inputValue, validUsername: true});
        } else {
            setInputValue({...inputValue, validUsername: false});
        }
    }, [inputValue.username])

    useEffect(() => {
        if (RegExp(inputRegexs.pwRegex).exec(inputValue.password)) {
            setInputValue({...inputValue, validPassword: true});
        } else {
            setInputValue({...inputValue, validPassword: false});
        }

    }, [inputValue.password]);

    useEffect(()=>{
        if(inputValue.checkPassword === inputValue.password && inputValue.checkPassword.match(inputRegexs.pwRegex)){
            setInputValue({...inputValue, validCheckPassword: true});
        } else {
            setInputValue({...inputValue, validCheckPassword: false});
        }

    },[inputValue.checkPassword])

    useEffect(() => {
        if (inputValue.name.match(inputRegexs.nameRegex)) {
            setInputValue({...inputValue, validName: true});
        } else {
            setInputValue({...inputValue, validName: false});
        }
    }, [inputValue.name])

    useEffect(() => {
        inputValue.email = inputValue.emailUserName + '@' + inputValue.domain

        if(inputValue.email.match(inputRegexs.emailRegex)){
            setInputValue({...inputValue, validEmail: true});
        } else {
            setInputValue({...inputValue, validEmail: false});
        }
    }, [inputValue.emailUserName, inputValue.domain]);

    useEffect(() => {
        if (inputValue.phone.match(inputRegexs.phoneRegex)) {
            setInputValue({...inputValue, validPhone: true});
        } else {
            setInputValue({...inputValue, validPhone: false});
        }
    }, [inputValue.phone]);

    // 직접 입력 선택시 이메일 도메인 직접입력 가능
    const handleDomainChange = (domain) => {
        if (domain === '직접 입력') {
            setIsReadOnly(false);
            setInputValue({...inputValue, domain:''});
        } else {
            setIsReadOnly(true);
            setInputValue({...inputValue, domain:domain});
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault()
        auth.join(inputValue)
            .then(response => {
                navigate('/auth/login')
                alert('회원가입 성공! 로그인 해주세요')
            })
            .catch(error => {
                alert(error.response.data);
            });
    }

    return (
        <Col lg="6" md="8">
            <Card>
                <CardHeader className="text-center">
                    <h3 className="title">Sign Up</h3>
                </CardHeader>
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
                <CardBody>
                    {/*<div className="text-center text-muted mb-4">
                            <small>회원가입을 위해 정보를 입력해주세요</small>
                        </div>*/}
                    <Form role="form" className="form-register" onSubmit={handleJoin}>
                        <FormGroup>
                            <label>아이디</label>
                            <Input
                                value={inputValue.username}
                                name="username"
                                placeholder="아이디"
                                type="text"
                                onChange={e => {
                                    setInputValue({...inputValue, username: e.target.value})
                                }}
                            />
                            <div className="text-muted font-italic">
                                <small>
                                    {" "}
                                    {inputValue.validUsername && inputValue.username !== ""
                                        ? <span className="text-success font-weight-700">유효한 아이디 입니다</span>
                                        : inputValue.username !== ""
                                            ? <span className="text-danger font-weight-700">유효하지 않은 아이디 입니다</span>
                                            : <span> 문자, 영문자, 숫자를 사용해주세요</span>
                                    }
                                </small>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <label>비밀번호</label>
                            <Input
                                value={inputValue.password}
                                placeholder="비밀번호"
                                name="password"
                                type="password"
                                onChange={(e) => {
                                    setInputValue({...inputValue, password: e.target.value})
                                }}
                                autoComplete="new-password"
                            />
                            {/*<InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        value={inputValue.password}
                                        placeholder="비밀번호"
                                        name="password"
                                        type="password"
                                        onChange={(e) => {
                                            setInputValue({...inputValue, password: e.target.value})
                                        }}
                                        autoComplete="new-password"
                                    />
                                </InputGroup>*/}
                            <div className="text-muted font-italic">
                                <small>
                                    {" "}
                                    {inputValue.validPassword && inputValue.password !== ""
                                        ? <span className="text-success font-weight-700">유효한 비밀번호 입니다.</span>
                                        : inputValue.password !== ""
                                            ? <span className="text-danger font-weight-700">유효하지 않은 비밀번호 입니다</span>
                                            : <span>하나의 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다</span>
                                    }
                                </small>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label>비밀번호 확인</label>
                            <Input
                                value={inputValue.checkPassword}
                                placeholder="비밀번호 확인"
                                name="checkPassword"
                                type="password"
                                onChange={(e) => {
                                    setInputValue({...inputValue, checkPassword: e.target.value})
                                }}
                                autoComplete="new-password"
                            />
                            {/*<InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        value={inputValue.checkPassword}
                                        placeholder="비밀번호 확인"
                                        name="checkPassword"
                                        type="password"
                                        onChange={(e) => {
                                            setInputValue({...inputValue, checkPassword: e.target.value})
                                        }}
                                        autoComplete="new-password"
                                    />
                                </InputGroup>*/}
                            <div className="text-muted font-italic">
                                <small>
                                    {" "}
                                    {inputValue.validCheckPassword && inputValue.checkPassword !== ""
                                        ? <span className="text-success font-weight-700">비밀번호가 일치합니다</span>
                                        : inputValue.checkPassword !== ""
                                            ? <span className="text-danger font-weight-700">비밀번호가 일치하지 않습니다</span>
                                            : <span>비밀번호를 확인해야 합니다</span>
                                    }
                                </small>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label>이름</label>
                            <Input
                                value={inputValue.name}
                                name="name"
                                placeholder="이름"
                                onChange={(e) => {
                                    setInputValue({...inputValue, name: e.target.value})
                                }}
                                type="text"
                            />
                            {/*<InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-circle-08"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        value={inputValue.name}
                                        name="name"
                                        placeholder="이름"
                                        onChange={(e) => {
                                            setInputValue({...inputValue, name: e.target.value})
                                        }}
                                        type="text"
                                    />
                                </InputGroup>*/}
                            <div className="text-muted font-italic">
                                <small>
                                    {
                                        inputValue.validName && inputValue.name !== ""
                                            ? <span className="text-success font-weight-700">유효한 이름 입니다.</span>
                                            : inputValue.name !== ""
                                                ? <span className="text-danger font-weight-700">유효한 이름이 아닙니다.</span>
                                                : <span>영어 대/소문자, 숫자, 한글을 사용해주세요</span>
                                    }
                                </small>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label>이메일</label>
                            <InputGroup className="emailInput">
                                <Input
                                    value={inputValue.emailUserName}
                                    onChange={(e) => setInputValue({
                                        ...inputValue,
                                        emailUserName: e.target.value
                                    })} // value={inputValue.emailUserName}(e.target.value)}
                                    placeholder="아이디"
                                    name="email"
                                    type="text"
                                    autoComplete="new-email"
                                />
                                <span className="">@</span>
                                <Input
                                    value={inputValue.domain}
                                    placeholder="example.com"
                                    name="domain"
                                    type="text"
                                    readOnly={isReadOnly}
                                    onChange={(e) => setInputValue({
                                        ...inputValue,
                                        domain: e.target.value
                                    })} // value={inputValue.domain}(e.target.value)}
                                />
                                <ButtonDropdown isOpen={dropdownOpen} toggle={() => {
                                    setDropdownOpen(!dropdownOpen)
                                }}>
                                    <DropdownToggle caret>
                                        직접 입력
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem
                                            onClick={() => handleDomainChange('gmail.com')}>gmail.com</DropdownItem>
                                        <DropdownItem
                                            onClick={() => handleDomainChange('naver.com')}>naver.com</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem onClick={() => handleDomainChange('직접 입력')}>직접
                                            입력</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </InputGroup>
                            <div className="text-muted font-italic">
                                <small>
                                    {
                                        inputValue.validEmail && inputValue.emailUserName !== "" && inputValue.domain !== ""
                                            ? <span className="text-success font-weight-700">유효한 이메일 입니다.</span>
                                            : inputValue.emailUserName !== ""
                                                ? <span className="text-danger font-weight-700">유효한 이메일이 아닙니다.</span>
                                                : <span>이메일을 입력해주세요</span>
                                    }
                                </small>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <label>생년월일</label>
                            <Input
                                vlaue={inputValue.birthDate}
                                placeholder="생년월일"
                                name="birthDate"
                                type="date"
                                onChange={e => setInputValue({...inputValue, birthDate: e.target.value})}
                            />
                            <div className="text-muted font-italic">
                                <small>
                                    {
                                        inputValue.birthDate !== ""
                                            ? <span className="text-success font-weight-700">유효한 생년월일 입니다.</span>
                                            : <span>생년월일을 입력해주세요</span>
                                    }
                                </small>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <label>휴대폰 번호</label>
                            <Input
                                vlaue={inputValue.phone}
                                placeholder="휴대폰 번호"
                                name="phone"
                                type="text"
                                onChange={e => setInputValue({...inputValue, phone: e.target.value})}
                            />
                            {/*<InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-mobile-button"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        vlaue={inputValue.phone}
                                        placeholder="휴대폰 번호"
                                        name="phone"
                                        type="text"
                                        onChange={e => setInputValue({...inputValue, phone: e.target.value})}
                                    />
                                </InputGroup>*/}
                            <div className="text-muted font-italic">
                                <small>
                                    {
                                        inputValue.validPhone && inputValue.phone !== ""
                                            ? <span className="text-success font-weight-700">유효한 번호 입니다.</span>
                                            : inputValue.phone !== ""
                                                ? <span className="text-danger font-weight-700">유효한 번호가 아닙니다.</span>
                                                : <span>"-"를 뺀 번호를 입력해주세요</span>
                                    }
                                </small>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">성별</label>
                            <InputGroup>
                                <Col>
                                    <FormGroup check>
                                        <Label className="p-2 mb-0" style={{fontSize: "0.875rem"}}>
                                            <Input
                                                type="radio"
                                                name="gender"
                                                value="m"
                                                checked="checked"
                                                onChange={e => setInputValue({
                                                    ...inputValue,
                                                    gender: e.target.value
                                                })}
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
                                                value="f"
                                                onChange={e => setInputValue({
                                                    ...inputValue,
                                                    gender: e.target.value
                                                })}
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
                                        name="agree"
                                        onClick={(e) => setInputValue({...inputValue, agree: !inputValue.agree})}
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
                            {/*<styled.ButtonBox type="submit" disabled={!submitRequirement}>
                                    Create account
                                </styled.ButtonBox>*/}
                            <Button className="my-4" color="primary" type="submit" disabled={!submitRequirement}>
                                Create account
                            </Button>
                        </div>

                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Register;
