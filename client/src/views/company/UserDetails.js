import React, {useEffect, useRef, useState} from "react";

// reactstrap components
import {Card, CardBody, CardFooter, CardText, Col, Row,} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import maleImg from "../../assets/img/userImg_male.png";
import {getMemberListInfoByIdx} from "../../apis/company";
import {format} from "date-fns";


function UserDetails() {
    const navigate = useNavigate();
    const imgRef = useRef();
    const memIdx = useParams().idx;
    const [user, setUser] = useState({});
    const genderLabel = {M: "남성", F: "여성"}
    const coverLetterLabel = {Pending: "미작성", Writing: "작성중", Complete: "작성완료"}
    const resumeLabel = {Pending: "미작성", Writing: "작성중", Complete: "제출완료"}
    const interviewLabel = {Pending: "미신청", Registered: "면접대기", Approved: "합격", Rejected: "불합격"}
    const programLabel = {Pending: "미신청", Registered: "가입대기", Approved: "확인", Rejected: "거절"}

    useEffect(() => {
        getMemberListInfoByIdx(memIdx).then(res => {
            setUser(res.data)
        })
    }, []);

    useEffect(() => {
        console.log(user)
    }, [user]);

    return (
        <div className="content user-details">
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
                                <label htmlFor="profile-img" className="profile_img">
                                    <img alt="profile image"
                                         ref={imgRef}
                                         name="profileImg"
                                         className="avatar"
                                         src={maleImg}
                                    />
                                </label>
                                <h5 className="sub-title">{user?.username}</h5>
                                <p className="title">{user?.name}</p>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col md={4}>
                                    <b>이력서</b>
                                    <div className="percent percent360">
                                        <span>80%</span>
                                    </div>
                                    <a onClick={(e) => {
                                        e.preventDefault()
                                        navigate("/")
                                    }}>
                                        바로가기
                                    </a>
                                </Col>
                                <Col md={4}>
                                    <b>자기소개서</b>
                                    <div className={"percent percent360"}>
                                        <span>0%</span>
                                    </div>
                                    <a onClick={(e) => {
                                        e.preventDefault()
                                        navigate("/")
                                    }}>
                                        바로가기
                                    </a>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="8">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col>
                                    <div className="quote-subcategory">개인 정보</div>
                                    <div>
                                        <label>이메일</label>
                                        <div className="form-control">{user?.email}</div>
                                    </div>
                                    <div>
                                        <label>주소</label>
                                        <div className="form-control">{user?.address}</div>
                                    </div>
                                    <div>
                                        <label>생일</label>
                                        <div className="form-control">{user?.birthDate ? format(new Date(user?.birthDate), 'yyyy-MM-dd') : null}</div>
                                    </div>
                                    <div>
                                        <label>성별</label>
                                        <div className="form-control">{genderLabel[user?.gender]}</div>
                                    </div>
                                    <div>
                                        <label>전화번호</label>
                                        <div className="form-control">{user?.phone?.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3")}</div>
                                    </div>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <div className="quote-subcategory">자소서 및 이력서</div>
                                            <div>
                                                <label>자소서 상태</label>
                                                <div className="form-control">{coverLetterLabel[user?.coverLetterStatus]}</div>
                                            </div>
                                            <div>
                                                <label>이력서 상태</label>
                                                <div className="form-control">{resumeLabel[user?.resumeStatus]}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="quote-subcategory">프로그램</div>
                                            <div>
                                                <label>프로그램 신청 상태</label>
                                                <div className="form-control">{programLabel[user?.pgRegStatus]}</div>
                                            </div>
                                            <div>
                                                <label>프로그램 가입 확정일</label>
                                                <div className="form-control">{user?.pgRegDate ?format(new Date(user?.pgRegDate), "yyyy-MM-dd HH:mm") : null}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="quote-subcategory">면접</div>
                                    <div>
                                        <label>면접 상태</label>
                                        <div className="form-control">{interviewLabel[user?.interviewStatus]}</div>
                                    </div>
                                    <div>
                                        <label>희망 면접일</label>
                                        <div className="form-control">{user?.registeredInterviewDate ? format(new Date(user.registeredInterviewDate), "yyyy-MM-dd HH:mm") : null}</div>
                                    </div>
                                    <div>
                                        <label>확정 면접일</label>
                                        <div className="form-control">{user?.assignedInterviewDate ? format(new Date(user.assignedInterviewDate), "yyyy-MM-dd HH:mm"): null}</div>
                                    </div>
                                    <div>
                                        <label>면접 코멘트</label>
                                        <div className="form-control">{user?.interviewComment}</div>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default UserDetails;
