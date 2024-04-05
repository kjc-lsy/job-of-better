import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, Row, Table} from "reactstrap";
import {Viewer} from "@toast-ui/react-editor";
import {getProgram} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";
import {format} from "date-fns";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCheck, faUserClock, faUsers, faUserSlash} from '@fortawesome/free-solid-svg-icons'
import TotalRegNumber from "../../../components/Infos/TotalRegNumber";
import ApprovedNumber from "../../../components/Infos/ApprovedNumber";
import PendingNumber from "../../../components/Infos/PendingNumber";
import RejectedNumber from "../../../components/Infos/RejectedNumber";

const ProgramInfo = () => {
    const {pgIdx} = useParams();
    const navigate = useNavigate();
    const {isLogin} = useAuth();
    const [program, setProgram] = useState();

    useEffect(() => {
        if (isLogin) {
            getProgram(pgIdx).then((response) => {
                const fetchedProgram = response.data
                setProgram({...fetchedProgram})
            });
        }
    }, [isLogin]);

    const handleModifyBtn = (pgIdx) => {
        navigate('/company/program-modify/' + pgIdx)
    }

    return (
        <div className="content program">
            <Card className='program-info'>
                <CardHeader>
                    <div className="program-info-tt">
                        <CardTitle tag="h1">{program ? program.pgTitle : null}</CardTitle>
                        <CardSubtitle>{program ? "등록일 : " + format(program.pgModifiedDate, 'yyyy-MM-dd') + " | 수정일: " + format(program.pgModifiedDate, 'yyyy-MM-dd') : null}</CardSubtitle>
                    </div>
                    <Button onClick={() => {
                        handleModifyBtn(pgIdx)
                    }}>수정하기</Button>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
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
                                                <label>총 신청자</label>
                                                <TotalRegNumber pgIdx={pgIdx}/>
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
                                                <label>참여자</label>
                                                <ApprovedNumber pgIdx={pgIdx}/>
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
                                                <label>미확인 자</label>
                                                <PendingNumber pgIdx={pgIdx}/>
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
                                                <label>불합격자</label>
                                                <RejectedNumber pgIdx={pgIdx}/>
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
                        </Col>
                        <Col>
                            <div className='program-title'>
                                <span>기간 정보</span>
                            </div>
                            <div className='program-content'>
                                <label>프로그램 기간</label>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <th>전체 프로그램 기간</th>
                                        <td>
                                            <Row>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="">시작일</label>
                                                        <h4>{program ? format(program.pgProgStartDate, 'yyyy-MM-dd') : null}</h4>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="">종료일</label>
                                                        <h4>{program ? format(program.pgProgEndDate, 'yyyy-MM-dd') : null}</h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>교육 진행 기간</th>
                                        <td>
                                            <Row>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="">시작일</label>
                                                        <h4>{program ? format(program.pgEduStartDate, 'yyyy-MM-dd') : null}</h4>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className=""><label htmlFor="">종료일</label>
                                                        <h4>{program ? format(program.pgEduEndDate, 'yyyy-MM-dd') : null}</h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                                <label>면접 기간</label>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <th>신청 가능 기간</th>
                                        <td>
                                            <Row>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="">시작일</label>
                                                        <h4>{program ? format(program.pgRegValStartDate, 'yyyy-MM-dd') : null}</h4>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="">종료일</label>
                                                        <h4>{program ? format(program.pgRegValEndDate, 'yyyy-MM-dd') : null}</h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>면접 가능 기간</th>
                                        <td>
                                            <Row>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="">시작일</label>
                                                        <h4>{program ? format(program.pgInterviewValStartDate, 'yyyy-MM-dd') : null}</h4>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className=""><label htmlFor="">종료일</label>
                                                        <h4>{program ? format(program.pgInterviewValEndDate, 'yyyy-MM-dd') : null}</h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>면접 가능 시간</th>
                                        <td>
                                            <Row>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="">시작시간</label>
                                                        <h4>{program ? (program.pgInterviewValStartTime ? program.pgInterviewValStartTime.substr(0, 5) : "시작 시간이 설정되지 않았습니다.") : null}</h4>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="">종료시간</label>
                                                        <h4>{program ? (program.pgInterviewValEndTime ? program.pgInterviewValEndTime.substr(0, 5) : "시작 시간이 설정되지 않았습니다.") : null}</h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
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