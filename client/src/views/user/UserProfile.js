import React, {useEffect, useRef} from "react";
import * as user from '../../apis/user';
import femaleImg from "../../assets/img/userImg_female.png";
import maleImg from "../../assets/img/userImg_male.png";

// reactstrap components
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Form, Row, Table,} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import KorDatePicker from "../../components/KorDatePicker";
import {allowedRange} from "rsuite/cjs/DateRangePicker/disabledDateUtils";
import {DatePicker} from "rsuite";
import {FaClock} from "react-icons/fa";
import {useAuth} from "../../contexts/AuthContextProvider";
import {Viewer} from "@toast-ui/react-editor";
import ProgCurrentStatus from "../../components/Infos/ProgCurrentStatus";

function UserProfile() {

    const navigate = useNavigate();
    const imgRef = useRef();
    const {isLogin} = useAuth();
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

        pgId: 0,
        pgComName: "",
        pgComTel: "",
        pgComAddr: "",

        pgTitle: "",
        pgContent: "",
        pgProgStartDate: "", //프로그램시작
        pgProgEndDate: "",
        pgEduStartDate: "", // 교육시작일
        pgEduEndDate: "",
        pgRegValStartDate: "", //등록가능날짜
        pgRegValEndDate: "",
        pgStatus:"",
        pgInterviewValStartDate: "", //인터뷰 시작
        pgInterviewValEndDate: "",
        pgInterviewValStartTime: "",
        pgInterviewValEndTime: "",

        interviewDate: new Date(),
        interviewTime: new Date().getHours() + ":" + new Date().getMinutes(),
    });

    useEffect(() => {
        Promise.all([userInfo(), pgInfo(), coverLetterInfo()])
            .catch((error) => {
                console.error(error.response.data);
            });
    }, []);

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

    // 사용자 정보 불러오기
    const userInfo = async () => {
        try {
            const response = await user.userProfileInfo();
            //console.log(response.data.desiredInterviewDate);
            // 사용자 정보 업데이트
            setInputValue((prevInputValue) => ({
                ...prevInputValue,
                name: response.data.name,
                profileImg: response.data.profileImg,
                gender: response.data.gender,
                pgRegStatus: response.data.pgRegStatus,
                interviewDate: new Date((response.data.desiredInterviewDate)?.split("T")[0]),
                interviewTime: new Date(response.data.desiredInterviewDate),
            }));
            //console.log(inputValue.interviewTime);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    // 프로그램 정보 불러오기
    const pgInfo = async () => {
        try {
            const response = await user.pgInfo();
            // 프로그램 정보 업데이트
            setInputValue((prevInputValue) => ({
                ...prevInputValue,

                pgComName: response.data.company.comName,
                pgComTel: response.data.company.comTel,
                pgComAddr: response.data.company.comAddress,

                pgId: response.data.program.pgIdx,
                pgTitle: response.data.program.pgTitle,
                pgStatus: response.data.program,
                pgProgStartDate: response.data.program.pgProgStartDate,
                pgProgEndDate: response.data.program.pgProgEndDate,
                pgEduStartDate: response.data.program.pgEduStartDate,
                pgEduEndDate: response.data.program.pgEduEndDate,
                pgRegValStartDate: response.data.program.pgRegValStartDate,
                pgRegValEndDate: response.data.program.pgRegValEndDate,
                pgInterviewValStartDate: response.data.program.pgInterviewValStartDate,
                pgInterviewValEndDate: response.data.program.pgInterviewValEndDate,
                pgInterviewValEndTime: response.data.program.pgInterviewValEndTime,
                pgInterviewValStartTime: response.data.program.pgInterviewValStartTime,
                pgContent: (response.data.program.pgContent).replace(/<[^>]+>/g, ''),


            }));
        } catch (error) {
            console.error(error.response.data);
        }
    };

    //coverletter 값 들고오기
    const coverLetterInfo = async () => {
        try {
            const response = await user.coverLetterInfo();
            setInputValue((prevInputValue) => ({
                ...prevInputValue,
                mclTitle: response.data.clList.mclTitle,
                mclDate: response.data.clList.mclModifiedDate,
                mclIsConfirm: response.data.clList.mclIsConfirm,
                coverLetterPercent: (response.data.clPercent[1] / response.data.clPercent[0]) * 100
            }))
        } catch (error) {
            console.error(error.response.data);
        }
    }

    const save = () => {
        // interviewDate를 'YYYY-MM-DD' 형식의 문자열로 변환
        const interviewDateStr = inputValue?.interviewDate.toISOString().split('T')[0];

        // interviewTime을 'HH:mm' 형식의 문자열로 변환
        const interviewTimeStr = inputValue?.interviewTime.toTimeString().split(' ')[0];

        // interviewDateTime 문자열 생성
        const interviewDateTime = interviewDateStr + 'T' + interviewTimeStr;
        console.log(interviewDateTime);

        // 서버에 저장
        if (interviewDateStr < inputValue.pgInterviewValStartDate || interviewDateStr > inputValue.pgInterviewValEndDate) {
            alert("해당 날짜엔 신청 할 수 없습니다.\n확인바랍니다.");
        } else if (interviewDateStr < inputValue.pgInterviewValStartTime || interviewDateStr > inputValue.pgInterviewValEndTime) {
            alert("해당 시간엔 신청 할 수 없습니다.\n확인바랍니다.");
        } else {
            user.interviewTimeSave(interviewDateTime)
                .then((response) => {
                    console.log(response.data);
                    alert("신청이 완료 되었습니다. \n기업관리자 확인 후 확정됩니다.")
                })
                .catch((error) => {
                    alert(error.response.data);
                });
        }
    }

   /* const ProgramState = () => {
        return (
            new Date() >= new Date(inputValue.pgProgStartDate) && new Date() <= new Date(inputValue.pgProgEndDate) ? "프로그램 진행중"
                : new Date() >= new Date(inputValue.pgEduStartDate) && new Date() <= new Date(inputValue.pgEduEndDate) ? "교육 진행중"
                    : new Date() >= new Date(inputValue.pgRegValStartDate) && new Date() <= new Date(inputValue.pgRegValEndDate) ? "신청 진행중"
                        : new Date() >= new Date(inputValue.pgInterviewValStartDate) && new Date() <= new Date(inputValue.pgInterviewValEndDate) ? "인터뷰 진행중" : "프로그램 종료"
        )
    }*/
    const viewMore = () => {
        let viewer = document.getElementById("mypg_viewer");
        viewer.classList.toggle("on");
        setTimeout(() => {
            if (viewer.classList.contains("on")) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }, 0);
    };


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
                                        <img alt="profile image"
                                             ref={imgRef}
                                             name="profileImg"
                                             className="avatar"
                                             src={inputValue.profileImg !== null ? inputValue.profileImg : inputValue.gender === "F" ? femaleImg : maleImg}
                                        />
                                    </a>
                                </label>
                                <h5 className="title">{inputValue.name}</h5>
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
                                    <div className={"percent percent" + inputValue.coverLetterPercent * 3.6}>
                                        <span>{inputValue.coverLetterPercent}%</span>
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
                                    <th className="text-center">날짜</th>
                                    <th className="text-center">바로가기</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{inputValue.mclTitle}</td>
                                    <td>{inputValue.mclDate ? new Date(inputValue?.mclDate)?.split("T")[0] : null}</td>
                                    <td className="text-center">
                                        {inputValue.mclIsConfirm === "confirm" ? "완료" :
                                            inputValue.mclIsConfirm === "denied" ? "거절" : "보류"}
                                    </td>
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
                                    <th className="text-center">작업 상태</th>
                                    <th className="text-center">날짜</th>
                                    <th className="text-center">바로가기</th>
                                </tr>
                                </thead>
                                <tbody>
                                {inputValue.mclTitle ?
                                    <tr>
                                        <td>{inputValue.mclTitle}</td>
                                        <td className="text-center">
                                            {inputValue.mclIsConfirm === "tmp" ? "임시저장" :
                                                inputValue.mclIsConfirm === "done" ? "완료" : "미작성"}
                                        </td>
                                        <td className="text-center">{inputValue.mclDate ? new Date(inputValue.mclDate)?.split("T")[0] : null}</td>
                                        <td className="text-center">
                                            <a onClick={(e) => {
                                                e.preventDefault();
                                                navigate("/user/cover-letter")
                                            }}>
                                                <FontAwesomeIcon size={"lg"} icon={faArrowCircleRight}/>
                                            </a>
                                        </td>

                                    </tr>
                                    :
                                    <tr>
                                        <td colSpan={5} class="text-center">자료가 없습니다.</td>
                                    </tr>
                                }
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
                                    <th className="text-center">기관명</th>
                                    <th className="text-center">전화번호</th>
                                    <th className="text-center">지역</th>
                                    <th className="text-center">상태</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><b class="title"
                                           onClick={e => navigate(`/user/program-info/${inputValue.pgId}`)}>{inputValue.pgTitle}</b>
                                    </td>
                                    <td className="text-center">{inputValue.pgComName}</td>
                                    <td className="text-center">{inputValue.pgComTel ? inputValue.pgComTel : "없음"}</td>
                                    <td className="text-center">{(inputValue.pgComAddr)?.split(" ").slice(0, 2).join(" ")}</td>
                                    <td className="text-center">
                                        <span
                                            className={inputValue.pgRegStatus === "Approved" ? "confirm" : inputValue.pgRegStatus === "Rejected" ? "reject" : "delay"}>
                                            {inputValue.pgRegStatus === "Approved" ? "확정" : inputValue.pgRegStatus === "Rejected" ? "거절" : "보류"}
                                        </span>
                                    </td>
                                </tr>

                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <div className="programInfo">
                                <div>
                                    <span>프로그램 진행 기한</span>
                                    <p>{inputValue.pgProgStartDate} ~ {inputValue.pgProgEndDate}</p>
                                </div>
                                <div>
                                    <span>프로그램 진행 상황</span>
                                    <p><ProgCurrentStatus program={inputValue.pgStatus}/> {/*{ProgramState()}*/}</p>
                                </div>
                                <Form role="form">
                                    <div>
                                        <span>면접 시간</span>
                                        <p>
                                            <KorDatePicker
                                                value={inputValue.interviewDate}
                                                name="interviewDate"
                                                format="yyyy-MM-dd"
                                                shouldDisableDate={(allowedRange(inputValue.pgInterviewValStartDate, inputValue.pgInterviewValEndDate))}
                                                onChange={e => {
                                                    setInputValue({...inputValue, interviewDate: e})
                                                }}
                                            />
                                            <DatePicker
                                                name="interviewTime"
                                                value={inputValue.interviewTime}
                                                format="HH:mm"
                                                hideHours={(hour) => {
                                                    const startTimeString = inputValue.pgInterviewValStartTime;
                                                    const startHour = parseInt(startTimeString?.split(':')[0]);
                                                    const endTimeString = inputValue.pgInterviewValEndTime;
                                                    const endHour = parseInt(endTimeString?.split(':')[0]);

                                                    return hour < startHour || hour > endHour
                                                }}
                                                hideMinutes={minute => minute % 15 !== 0}
                                                hideSeconds={second => second % 30 !== 0}
                                                caretAs={FaClock}
                                                onChange={e => {
                                                    // e를 Date 객체로 파싱
                                                    const selectedTime = new Date(e);
                                                    setInputValue(prevInputValue => ({
                                                        ...prevInputValue,
                                                        interviewTime: selectedTime
                                                    }));
                                                }}
                                            />
                                            <Button type="button" onClick={(e) => {
                                                e.preventDefault();
                                                save()
                                            }}>
                                                신청
                                            </Button>
                                        </p>
                                    </div>
                                </Form>
                                <div>
                                    <span>내용</span>
                                    <p id="mypg_viewer">
                                        <Viewer
                                            key={inputValue.pgContent}
                                            initialValue={inputValue.pgContent}
                                        />
                                    </p>
                                    <Button type="button" onClick={viewMore} className="btn02 viewMore">더
                                        보기</Button>
                                </div>
                                <div>
                                    <span>상태</span>
                                    <p>
                                        <span
                                            className={inputValue.pgRegStatus === "Approved" ? "confirm" : inputValue.pgRegStatus === "Rejected" ? "reject" : "delay"}>
                                            {inputValue.pgRegStatus === "Approved" ? "확정" : inputValue.pgRegStatus === "Rejected" ? "거절" : "보류"}
                                        </span>
                                    </p>
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
