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

function UserProfile() {
    const [inputValue, setInputValue] = React.useState({
        email: "",
        validEmail: false,
        emailUserName: "",
        domain: "",
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
        <div className="content">
            <Row>
                <Col md="4">
                    <Card className="card-user">
                        <CardBody>
                            <CardText/>
                            <div className="author">
                                <div className="block block-one"/>
                                <div className="block block-two"/>
                                <div className="block block-three"/>
                                <div className="block block-four"/>
                                <input type="file" id="profile-img"/>
                                <label htmlFor="profile-img">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar"
                                            src={require("assets/img/emilyz.jpg")}
                                        />

                                    </a>
                                </label>
                                <h5 className="title">Mike Andrew</h5>
                                <p className="description">Ceo/Co-Founder</p>
                            </div>
                            {/*<div className="card-description">
                                Do not be scared of the truth because we need to restart the
                                human foundation in truth And I love you like Kanye loves
                                Kanye I love Rick Owens’ bed design but the back is...
                            </div>*/}
                        </CardBody>
                        <CardFooter>
                            <Table>
                                <thead>
                                <tr>
                                    <th colspan="2">이력서 / 자기소개서</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <a onClick={(e)=> {
                                            e.preventDefault()
                                            navigate("/user/resume")}}>
                                            이력서 바로가기
                                        </a>
                                    </td>
                                    <td>
                                        상태
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a onClick={(e) => {
                                            e.preventDefault()
                                            navigate("/user/cover-letter")
                                        }}>
                                            자기소개서 바로가기
                                        </a>
                                    </td>
                                    <td>상태</td>
                                </tr>
                                </tbody>
                            </Table>

                        </CardFooter>
                        {/*<CardFooter>
                            <div className="button-container">
                                <Button className="btn-icon btn-round" color="facebook">
                                    <i className="fab fa-facebook"/>
                                </Button>
                                <Button className="btn-icon btn-round" color="twitter">
                                    <i className="fab fa-twitter"/>
                                </Button>
                                <Button className="btn-icon btn-round" color="google">
                                    <i className="fab fa-google-plus"/>
                                </Button>
                            </div>
                        </CardFooter>*/}
                    </Card>

                </Col>
                <Col md="8">
                      <Card>
                        <CardHeader>
                            <h5 className="title">내 정보</h5>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    {/*<Col className="pr-md-1" md="5">
                                        <FormGroup>
                                            <label>Company (disabled)</label>
                                            <Input
                                                defaultValue="Creative Code Inc."
                                                disabled
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>*/}
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
                                    <Col className="pr-md-1" md="12">
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
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">프로그램</CardTitle>
                            <p className="category">신청한 프로그램 정보입니다. 면접시간 등 확인해주세요.</p>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter">
                                <thead className="text-primary">
                                <tr>
                                    <th>프로그램명</th>
                                    <th>기관명</th>
                                    <th>전화번호</th>
                                    <th className="text-center">면접시간</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                    <td>Niger</td>
                                    <td>Oud-Turnhout</td>
                                    <td className="text-center">$36,738</td>
                                </tr>

                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </div>
    );
}

export default UserProfile;
