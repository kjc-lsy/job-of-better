// reactstrap components
import {
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    Label,
    Row,
} from "reactstrap";
import React, {useEffect, useState} from "react";
import * as auth from '../../apis/auth';
import {useNavigate} from "react-router-dom";
import companyPaper from "../../assets/img/company_registration.png";
import Postcode from "../../components/AddrPlugin";

const CompanyRegister = () => {
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
        domain: "",

        phone: "",
        validPhone: false,

        b_no: "",
        validBNo: false,

        b_name: "",
        b_img: "",
        b_detailAddr: "",

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

    const submitRequirement =
        inputValue.validBNo &&
        inputValue.validUsername &&
        inputValue.validCheckPassword &&
        inputValue.validPassword &&
        inputValue.validName &&
        inputValue.validEmail &&
        inputValue.validPhone &&
        inputValue.agree;

    const [dropdownOpen, setDropdownOpen] = useState(false); // 도메인 토글용
    const [isReadOnly, setIsReadOnly] = useState(true); // 도메인 입력란의 readOnly 상태 관리를 위한 새로운 상태 변수

    useEffect(() => {
        if (RegExp(inputRegexs.usernameRegex).exec(inputValue.username)) {
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

    useEffect(() => {
        if (inputValue.checkPassword === inputValue.password && inputValue.checkPassword.match(inputRegexs.pwRegex)) {
            setInputValue({...inputValue, validCheckPassword: true});
        } else {
            setInputValue({...inputValue, validCheckPassword: false});
        }

    }, [inputValue.checkPassword])

    useEffect(() => {
        if (inputValue.name.match(inputRegexs.nameRegex)) {
            setInputValue({...inputValue, validName: true});
        } else {
            setInputValue({...inputValue, validName: false});
        }
    }, [inputValue.name])

    useEffect(() => {
        inputValue.email = inputValue.emailUserName + '@' + inputValue.domain

        if (inputValue.email.match(inputRegexs.emailRegex)) {
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
            setInputValue({...inputValue, domain: ''});
        } else {
            setIsReadOnly(true);
            setInputValue({...inputValue, domain: domain});
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

    const getJsonData = async () => {
        const data = {
            "b_no": [inputValue.b_no] // inputValue로부터 b_no 값을 가져옵니다.
        };

        try {
            const response = await fetch("https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=vXG2ZQwLkIqqESDl%2BCqEtOM9nkKJcMvZOTu1%2F4SLsCLfVm%2FKMFiQc1jVDOjHs9ttLpMGl%2FfuNldQUP%2FOekqJjA%3D%3D", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);
            if(result.data[0].b_stt !== ""){
                setInputValue({...inputValue, validBNo: true});
            }else {
                setInputValue({...inputValue, validBNo: false});
            }
            //console.log(result.data[0].b_stt);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Col lg="6" md="8" className="companyRegisterContainer">
            <Card>
                <Form role="form" className="form-register" onSubmit={handleJoin}>
                    <CardBody>
                        <CardHeader className="text-center">
                            <h3 className="title">기업 회원 가입</h3>
                            <p>모든 정보를 입력 후 회원가입을 눌러주세요.</p>
                        </CardHeader>
                        <h4>기업 인증</h4>
                        <FormGroup>
                            <label>회사명</label>
                            <Input
                                value={inputValue.b_name}
                                name="b_name"
                                placeholder="회사명"
                                type="text"
                                onChange={e => {
                                    setInputValue({...inputValue, b_name: e.target.value})
                                }}
                            />
                            <div className="text-muted font-italic">
                                <small><span>사업자등록원에 등록된 회사명을 입력해주세요.</span></small>
                            </div>
                        </FormGroup>
                        <FormGroup className="register_addr">
                            <label>사업자 등록 번호</label>
                            <Row>
                                <Col md={10}>
                            <Input
                                value={inputValue.b_no}
                                name="username"
                                placeholder="사업자 등록 번호"
                                type="text"
                                onChange={e => {
                                    setInputValue({...inputValue, b_no: e.target.value})
                                }}
                            />
                            <div className="text-muted font-italic">
                                <small>
                                    {" "}
                                    {inputValue.validBNo && inputValue.b_no !== ""
                                        ? <span className="text-success font-weight-700">유효한 사업자 등록 번호 입니다</span>
                                        : inputValue.b_no !== ""
                                            ? <span className="text-danger font-weight-700">유효하지 않은 사업자 등록 번호 입니다</span>
                                            : <span><b className="text-danger">발급일 90일 이내</b> 사업자등록증명원의 발급번호만 가능합니다. (사업자등록증 불가)</span>
                                    }
                                </small>
                            </div>
                                </Col>
                                <Col md={2}><Button onClick={getJsonData}>인증하기</Button></Col>
                            </Row>

                        </FormGroup>
                        <FormGroup className="register_file">
                            <label>
                                <div>사업자등록증명원</div>
                                <div className="file form-control">
                                    <img src={companyPaper} alt=""/>
                                    <Button type="button">파일선택</Button>
                                    <p>사업자등록증명원의 발급서류를 첨부해주세요.</p>
                                </div>
                            </label>
                            <Input
                                value={inputValue.b_img}
                                name="b_img"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={e => {

                                    setInputValue({...inputValue, b_img: e.target.value})
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="register_addr">
                            <label>회사 주소</label>
                            <Postcode/>
                            <Row>
                                <Col md={12}>
                                    <Input
                                        id="b_detailAddr"
                                        name="b_detailAddr"
                                        placeholder="상세주소"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <label>대표자명</label>
                            <Input
                                value={inputValue.b_ceoname}
                                name="b_ceoname"
                                placeholder="대표자명"
                                type="text"
                                onChange={e => {
                                    setInputValue({...inputValue, b_ceoname: e.target.value})
                                }}
                            />
                            <div className="text-muted font-italic">
                                <small>
                                    {" "}
                                    {inputValue.validUsername && inputValue.b_ceoname !== ""
                                        ? <span className="text-success font-weight-700">유효한 아이디 입니다</span>
                                        : inputValue.b_ceoname !== ""
                                            ? <span className="text-danger font-weight-700">유효하지 않은 아이디 입니다</span>
                                            : <span>사업자증명원에 등록된 대표자명을 입력해주세요.</span>
                                    }
                                </small>
                            </div>
                        </FormGroup>
                    </CardBody>
                    <CardBody>
                        <h4>담당자 정보</h4>
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
                            <label>전화번호</label>
                            <Input
                                vlaue={inputValue.phone}
                                placeholder="연락가능한 전화번호를 입력해주세요."
                                name="phone"
                                type="text"
                                onChange={e => setInputValue({...inputValue, phone: e.target.value})}
                            />
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
                            <label>이메일</label>
                            <InputGroup className="emailInput">
                                <Input
                                    value={inputValue.emailUserName}
                                    onChange={(e) => setInputValue({
                                        ...inputValue,
                                        emailUserName: e.target.value
                                    })} // value={inputValue.emailUserName}(e.target.value)}
                                    placeholder="회사 이메일"
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
