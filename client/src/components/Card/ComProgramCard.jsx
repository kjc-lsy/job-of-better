import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck, faUserClock, faUsers} from "@fortawesome/free-solid-svg-icons";
import {deleteProgram} from "../../apis/program";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContextProvider";
import ProgramCardHeader from "./ProgramCardHeader";
import TotalRegNumber from "../Infos/numbers/TotalRegNumber";
import ApprovedNumber from "../Infos/numbers/ApprovedNumber";
import PendingNumber from "../Infos/numbers/PendingNumber";
import {Viewer} from "@toast-ui/react-editor";

const ComProgramCard = ({program, loadPrograms}) => {
    const navigate = useNavigate();
    const {roles} = useAuth();
    const handleDeleteBtn = async (id) => {
        if (window.confirm('프로그램을 삭제합니다')) {
            await deleteProgram(id);
            loadPrograms();
        }
    }

    const handleInfoBtn = (pgIdx) => {
        navigate('../program-info/' + pgIdx)
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
                        <div className="curr-status">면접 진행중</div>
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
                        <label>미확인 자</label>
                        <PendingNumber pgIdx={program.pgIdx}/>
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
                        <div className="form-control"><span>2023. 12. 01</span> ~ <span>2023. 12. 01</span></div>
                    </Col>
                    <Col md="6">
                        <label>교육기간</label>
                        <div className="form-control"><span>2023. 12. 01</span> ~ <span>2023. 12. 01</span></div>
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
                {roles.isCompany ? <Button onClick={() => handleDeleteBtn(program.pgIdx)}>삭제</Button> : null}
            </CardFooter>
        </Card>
    );
};

export default ComProgramCard;