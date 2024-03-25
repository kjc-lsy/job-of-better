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
                            <h4>이력서 / 자기소개서</h4>
                            <Row>
                                <Col md={6}>
                                    <b>이력서</b>
                                    <div className="percent">
                                        <span>80%</span>
                                    </div>
                                    <a onClick={(e) => {
                                        e.preventDefault()
                                        navigate("/user/resume")
                                    }}>
                                        바로가기
                                    </a>
                                </Col>
                                <Col md={6}></Col>
                            </Row>
                            {/*<Table>
                                <thead>
                                <tr>
                                    <th>이력서 / 자기소개서</th>
                                    <th>진행도</th>
                                    <th>상태</th>
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
                                        <div className="range">
                                            <span className="box8">80%</span>
                                        </div>
                                    </td>
                                    <td>
                                        제출
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
                                    <td>
                                        <div className="range">
                                            <span className="box2">20%</span>
                                        </div>
                                    </td>
                                    <td>임시저장</td>
                                </tr>
                                </tbody>
                            </Table>*/}

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
