import React, {useState} from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col, NavLink, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, CardTitle, Table,
} from "reactstrap";
import {Navigate, useNavigate} from "react-router-dom";
import KorDatePicker from "../../components/KorDatePicker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {useLoading} from "../../contexts/LoadingProvider";
import MyHomeUserInfo from "../../components/Infos/MyHomeUserInfo";
import MyHomeProgramInfo from "../../components/Infos/MyHomeProgramInfo";

function UserProfile() {
    const {loading, setLoading} = useLoading(false);
    const [infoLoading, setInfoLoading] = useState(false);

    const [inputValue, setInputValue] = React.useState({
        name: "",
        profileImg: "", //require("assets/img/emilyz.jpg")
        gender: "",
        pgRegStatus: "",

        resumeLength: 0,
        resumeTotalLength: 0,
        resumePercent: 0,
        coverLetterLength: 0,
        coverLetterTotalLength: 0,
        coverLetterPercent: 0,

        mclTitle: "",
        mclDate: "",
        mclIsConfirm: "",

        resumeTitle: "",
        resumeIsConfirm: "",

        registeredInterviewDatetime: null,
        registeredInterviewDate: null,
        registeredInterviewTime: null,

        assignedInterviewDate: "",
    });
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true); // 도메인 입력란의 readOnly 상태 관리를 위한 새로운 상태 변수

    const handleDomainChange = (domain) => {
        if (domain === '직접 입력') {
            setIsReadOnly(false);
            setInputValue({...inputValue, domain: ''});
        } else {
            setIsReadOnly(true);
            setInputValue({...inputValue, domain: domain});
        }
    };

    const navigate = useNavigate();
    return (
        <div className="content user-profile-wrapper">
            {loading ? "" :
            <Row>
                <Col md="4">
                    <MyHomeUserInfo setInfoLoading={setInfoLoading} setLoading={setLoading} inputValue={inputValue} setInputValue={setInputValue} />
                </Col>
                <Col md="8">
                      <Card className="modify_form">
                        <CardHeader>
                            <h5 className="title">내 정보 수정</h5>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <label>아이디</label>
                                            <Input
                                                defaultValue="michael23"
                                                placeholder="Username"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-md-1" md="6">
                                        <FormGroup>
                                            <label>이름</label>
                                            <Input
                                                defaultValue="Mike"
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <label htmlFor="birth_date">생년월일</label>
                                            <KorDatePicker id="birth_date" name="birth_date" />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-md-1" md="6">
                                        <FormGroup>
                                            <label htmlFor="phone">전화번호</label>
                                            <Input type="text" id="phone" name="phone" placeholder="'-'없이 번호만 입력"  />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <label htmlFor="exampleInputEmail1">
                                                이메일
                                            </label>
                                            <InputGroup className="emailInput">
                                                <Input
                                                    value={inputValue.emailUserName}
                                                    onChange={(e) => setInputValue({
                                                        ...inputValue,
                                                        emailUserName: e.target.value
                                                    })} // value={inputValue.emailUserName}(e.target.value)}
                                                    placeholder="이메일"
                                                    name="email"
                                                    type="text"
                                                    autoComplete="new-email"
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <InputGroup className="emailInput">
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
                                                    <DropdownToggle caret className="domainSelect">
                                                        선택 <FontAwesomeIcon icon={faChevronDown}/>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem
                                                            onClick={() => handleDomainChange('gmail.com')}>gmail.com</DropdownItem>
                                                        <DropdownItem
                                                            onClick={() => handleDomainChange('naver.com')}>naver.com</DropdownItem>
                                                        <DropdownItem
                                                            onClick={() => handleDomainChange('daum.com')}>daum.com</DropdownItem>
                                                        <DropdownItem
                                                            onClick={() => handleDomainChange('nate.com')}>nate.com</DropdownItem>
                                                        <DropdownItem divider/>
                                                        <DropdownItem onClick={() => handleDomainChange('직접 입력')}>직접
                                                            입력</DropdownItem>
                                                    </DropdownMenu>
                                                </ButtonDropdown>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label>주소</label>
                                            <Input
                                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                placeholder="Home Address"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Form>
                        </CardBody>
                          <CardFooter>
                              <Button className="btn-fill" color="primary" type="submit">
                                  저장
                              </Button>
                          </CardFooter>
                      </Card>
                    {infoLoading && <MyHomeProgramInfo inputValue={inputValue} setInputValue={setInputValue}/>}
                </Col>

            </Row>
            }
        </div>
    );
}

export default UserProfile;
