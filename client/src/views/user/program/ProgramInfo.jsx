import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import {Viewer} from "@toast-ui/react-editor";
import {getProgram} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";
import {format} from "date-fns";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCheck, faUserClock, faUsers, faUserSlash} from '@fortawesome/free-solid-svg-icons'
import {getComNameByComIdx} from "../../../apis/company";
import {setPgIdxOnUser} from "../../../apis/user";

const ProgramInfo = () => {
    const {pgIdx} = useParams();
    const {isLogin} = useAuth();
    const [program, setProgram] = useState();
    const [comName, setComName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            getProgram(pgIdx).then((response) => {
                const fetchedProgram = response.data
                setProgram({...fetchedProgram})
            });
            getComNameByComIdx().then((response) => {
                setComName(response.data);
            })
        }
    }, [isLogin]);

    const handleSubmitBtn = async (pgIdx) => {
        if(window.confirm( program.pgTitle + ' 프로그램을 신청할까요?')){
            await setPgIdxOnUser(pgIdx);
            navigate('/user/user-profile');
        }
    }

    return (
        <div className="content program">
            <Card className='program-info'>
                <CardHeader>
                    <div className="program-info-tt">
                        <span className="company-name">{comName}</span>
                        <CardTitle tag="h1">{program ? program.pgTitle : null}</CardTitle>
                        <CardSubtitle>{program ? "등록일 : " + format(program.pgModifiedDate, 'yyyy-MM-dd') + " | 수정일: " + format(program.pgModifiedDate, 'yyyy-MM-dd') : null}</CardSubtitle>
                    </div>
                    <Button onClick={() => {
                        handleSubmitBtn(pgIdx)
                    }}>신청하기</Button>
                </CardHeader>
                <CardBody>
                    <div className='program-title'>
                        <span>프로그램 정보</span>
                    </div>
                    <div className='program-content'>
                        <Row>
                            <Col>
                                <label>현재 상태</label>
                                <div className="curr-status">면접 진행중</div>
                            </Col>
                        </Row>
                        <Row className="ppl-info-row">
                            <Col>
                                <Row className="ppl-info">
                                    <Col>
                                                <span>
                                                <FontAwesomeIcon icon={faUsers}/>
                                                    </span>
                                    </Col>
                                    <Col>
                                        <label>총 참여자 수</label>
                                        <div className="ppl-num">9명</div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="ppl-info">
                                    <Col>
                                                <span>
                                                    <FontAwesomeIcon icon={faUserCheck}/>
                                                </span>
                                    </Col>
                                    <Col>
                                        <label>면접 참여 수</label>
                                        <div className="ppl-num">9명</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="ppl-info-row">
                            <Col>
                                <Row className="ppl-info">
                                    <Col>
                                                <span>
                                                    <FontAwesomeIcon icon={faUserClock}/>
                                                </span>
                                    </Col>
                                    <Col>
                                        <label>미확인 수</label>
                                        <div className="ppl-num">9명</div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="ppl-info">
                                    <Col>
                                                <span>
                                                    <FontAwesomeIcon icon={faUserSlash}/>
                                                </span>
                                    </Col>
                                    <Col>
                                        <label>불합격자 수</label>
                                        <div className="ppl-num">9명</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>AI 교육요약</label>
                                <div className="form-control">{program ? program.pgContentSummary : null}</div>
                            </Col>
                        </Row>
                    </div>
                    <div className='program-title'>
                        <span>프로그램 내용</span>
                    </div>
                    <div className='program-content'>
                        <Viewer
                            key={program ? program.pgContent : null}
                            initialValue={program ? program.pgContent : null}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProgramInfo;