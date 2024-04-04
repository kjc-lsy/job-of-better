import React, {useRef, useState} from "react";

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
    Col, NavLink, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, CardTitle, Table, Nav,
} from "reactstrap";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown,faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import KorDatePicker from "../../components/KorDatePicker";
import ProgDateRangePicker from "../../components/Program/ProgDateRangePicker";
import TimeRange30Picker from "../../components/Program/TimeRange30Picker";
import {allowedRange, combine} from "rsuite/cjs/DateRangePicker/disabledDateUtils";
import {DatePicker} from "rsuite";
import {FaClock} from "react-icons/fa";


function UserProfile() {

    const imgRef = useRef();

    const [inputValue, setInputValue] = React.useState({
        email: "",
        validEmail: false,
        emailUserName: "",
        domain: "",
        name: "",
        profileImg: require("assets/img/emilyz.jpg"),
    });

    const changeProfileImg = () => {
        document.getElementById("profile-img").click();
    };

    // 파일 변경 핸들러
    const handleFileChange = async (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setInputValue({
                ...inputValue,
                profileImg: reader.result,
            });
        };
        // 파일 업로드 등의 추가 작업을 수행할 수 있습니다.
    };

    const save =() => {
        console.log(inputValue);
    }

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
                                <input type="file" id="profile-img" onChange={handleFileChange}/>
                                <label htmlFor="profile-img" className="profile_img">
                                    <a href="#pablo" onClick={(e) => {
                                        e.preventDefault();
                                        changeProfileImg(e); // changeProfileImg 함수 호출 시 이벤트 객체 전달
                                    }}>
                                        <img
                                            alt="..."
                                            className="avatar"
                                            src={inputValue.profileImg}
                                        />
                                    </a>
                                </label>
                                <h5 className="title">이용민</h5>
                                <p className="description">인하대 졸업</p>
                            </div>
                            {/*<div className="card-description">
                                Do not be scared of the truth because we need to restart the
                                human foundation in truth And I love you like Kanye loves
                                Kanye I love Rick Owens’ bed design but the back is...
                            </div>*/}
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col md={4}>
                                    <b>이력서</b>
                                    <div className="percent percent288">
                                        <span>80%</span>
                                    </div>
                                    <a onClick={(e) => {
                                        e.preventDefault()
                                        navigate("/user/resume")
                                    }}>
                                        바로가기
                                    </a>
                                </Col>
                                <Col md={4}>
                                    <b>자기소개서</b>
                                    <div className="percent percent52">
                                        <span>20%</span>
                                    </div>
                                    <a onClick={(e) => {
                                        e.preventDefault()
                                        navigate("/user/cover-letter")
                                    }}>
                                        바로가기
                                    </a>
                                </Col>
                            </Row>

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
                    <Card className="card-user-box">
                        <CardHeader>
                            <CardTitle tag="h4">이력서</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter">
                                <thead className="text-primary">
                                <tr>
                                    <th>제목</th>
                                    <th className="text-center">작업 상태</th>
                                    <th className="text-center">바로가기</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                    <td className="text-center">완료</td>
                                    <td className="text-center">
                                        <a onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/user/resume")
                                        }}>
                                            <FontAwesomeIcon size={"lg"} icon={faArrowCircleRight}/>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                    <Card className="card-user-box">
                        <CardHeader>
                            <CardTitle tag="h4">자기소개서</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter">
                                <thead className="text-primary">
                                <tr>
                                    <th>제목</th>
                                    <th className="text-center">피드백</th>
                                    <th className="text-center">작업 상태</th>
                                    <th className="text-center">바로가기</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                    <td className="text-center">dkssud</td>
                                    <td className="text-center">완료</td>
                                    <td className="text-center">
                                        <a onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/user/cover-letter")
                                        }}>
                                            <FontAwesomeIcon size={"lg"} icon={faArrowCircleRight}/>
                                        </a>
                                    </td>
                                </tr>

                                </tbody>
                            </Table>
                        </CardBody>
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
                                    {/*<th className="text-center">면접시간</th>
                                    <th className="text-center">상태</th>*/}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>AI(인공지능)&빅데이터응용 SW개발자 양성과정</td>
                                    <td>(주) 안녕하세요</td>
                                    <td>010-1234-5678</td>
                                    {/*<td className="text-center">24.04.15 14:30</td>
                                    <td className="text-center">확정</td>*/}
                                </tr>

                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <div className="programInfo">
                                <div>
                                    <span>프로그램 진행 기한</span>
                                    <p>2024.04.15 ~ 2024.04.30</p>
                                </div>
                                <div>
                                    <span>프로그램 진행 상황</span>
                                    <p>면접 진행</p>
                                </div>
                                <Form onSubmit={save}>
                                <div>
                                    <span>면접 시간</span>
                                    <p>
                                        <KorDatePicker
                                            shouldDisableDate={(allowedRange('2024-02-15', new Date()))}
                                        />
                                        <DatePicker
                                            format="HH:mm"
                                            hideHours={hour => hour < 8 || hour > 22}
                                            hideMinutes={minute => minute % 15 !== 0}
                                            hideSeconds={second => second % 30 !== 0}
                                            caretAs={FaClock}
                                        />
                                        <Button>
                                            제출
                                        </Button>
                                    </p>
                                </div>
                                </Form>
                                <div>
                                    <span>내용</span>
                                    <p>내용 내용 내용</p>
                                </div>
                                <div>
                                    <span>상태</span>
                                    <p>확정</p>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                    {/*<Card>
                        <CardHeader>
                            <CardTitle tag="h4">이력서</CardTitle>
                            <p className="category">이력서 진행내역입니다.</p>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter">
                                <thead className="text-primary">
                                <tr>
                                    <th>제목</th>
                                    <th>기관명</th>
                                    <th>전화번호</th>
                                    <th className="text-center">작업 상태</th>
                                    <th className="text-center">바로가기</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                    <td>Niger</td>
                                    <td>Oud-Turnhout</td>
                                    <td className="text-center">완료</td>
                                    <td className="text-center">
                                        <a onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/user/resume")
                                        }}>
                                            <FontAwesomeIcon size={"lg"} icon={faArrowCircleRight}/>
                                        </a>
                                    </td>
                                </tr>

                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>*/}
                    {/*<Card>
                        <CardHeader>
                            <CardTitle tag="h4">자기소개서</CardTitle>
                            <p className="category">자기소개서 진행내역입니다.</p>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter">
                                <thead className="text-primary">
                                <tr>
                                    <th>제목</th>
                                    <th>기관명</th>
                                    <th>전화번호</th>
                                    <th className="text-center">피드백</th>
                                    <th className="text-center">작업 상태</th>
                                    <th className="text-center">바로가기</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                    <td>Niger</td>
                                    <td>Oud-Turnhout</td>
                                    <td className="text-center">dkssud</td>
                                    <td className="text-center">완료</td>
                                    <td className="text-center">
                                        <a onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/user/cover-letter")
                                        }}>
                                            <FontAwesomeIcon size={"lg"} icon={faArrowCircleRight}/>
                                        </a>
                                    </td>
                                </tr>

                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>*/}
                </Col>

            </Row>
        </div>
    );
}

export default UserProfile;
