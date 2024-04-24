import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck, faUserClock, faUsers} from "@fortawesome/free-solid-svg-icons";
import {deleteProgram} from "../../apis/program";
import {useNavigate} from "react-router-dom";
import ProgramCardHeader from "./ProgramCardHeader";
import TotalRegNumber from "../Infos/numbers/TotalRegNumber";
import ApprovedNumber from "../Infos/numbers/ApprovedNumber";
import RegisteredNumber from "../Infos/numbers/RegisteredNumber";
import {Viewer} from "@toast-ui/react-editor";
import ProgCurrentStatus from "../Infos/ProgCurrentStatus";

const ComProgramCard = ({program, loadPrograms}) => {
    const navigate = useNavigate();
    const handleDeleteBtn = async (id) => {
        if (window.confirm('프로그램을 삭제합니다')) {
            await deleteProgram(id);
            loadPrograms();
        }
    }

    const handleInfoBtn = (pgIdx) => {
        navigate('../program-details/' + pgIdx)
    }

    return (
        <Card>
            <ProgramCardHeader
                program={program}
            />
            <CardBody>
                <Row>
                    <Col>
                        <label>현재상태</label>
                        <ProgCurrentStatus
                            program={program}
                        />
                    </Col>
                </Row>
                <Row className="num-info-section">
                    <Col md='3'>
                        <div>
                            <FontAwesomeIcon icon={faUsers}/>
                        </div>
                        <label>총 신청자</label>
                        <TotalRegNumber pgIdx={program.pgIdx}/>
                    </Col>
                    <Col md='3'>
                        <div>
                            <FontAwesomeIcon icon={faUserCheck}/>
                        </div>
                        <label>참여자 수</label>
                        <ApprovedNumber pgIdx={program.pgIdx}/>
                    </Col>
                    <Col md='3'>
                        <div>
                            <FontAwesomeIcon icon={faUserClock}/>
                        </div>
                        <label>가입신청</label>
                        <RegisteredNumber pgIdx={program.pgIdx}/>
                    </Col>
                    {/*<Col md='3'>*/}
                    {/*    <div>*/}
                    {/*        <FontAwesomeIcon icon={faUserTie}/>*/}
                    {/*    </div>*/}
                    {/*    <label>면접 참여자 수</label>*/}
                    {/*    <div className="num-info">4명</div>*/}
                    {/*</Col>*/}
                </Row>
                <Row>
                    <Col md="6">
                        <label>신청기간</label>
                        <div className="form-control"><span>{program.pgRegValStartDate}</span> ~ <span>{program.pgRegValEndDate}</span></div>
                    </Col>
                    <Col md="6">
                        <label>교육기간</label>
                        <div className="form-control"><span>{program.pgEduStartDate}</span> ~ <span>{program.pgEduEndDate}</span></div>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label>AI 교육요약</label>
                        <div className="form-control">
                            <Viewer
                                key={program ? program.pgContentSummary : null}
                                initialValue={program ? program.pgContentSummary : ""}
                            />
                        </div>
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <Button onClick={() => handleInfoBtn(program.pgIdx)}>상세정보</Button>
                <Button onClick={() => handleDeleteBtn(program.pgIdx)}>삭제</Button>
            </CardFooter>
        </Card>
    );
};

export default ComProgramCard;