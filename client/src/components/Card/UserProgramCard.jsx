import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, Row} from "reactstrap";
import {cancelRegister, registerProgram} from "../../apis/program";
import {useNavigate} from "react-router-dom";
import ProgramCardHeader from "./ProgramCardHeader";
import {Viewer} from "@toast-ui/react-editor";
import {useAuth} from "../../contexts/AuthContextProvider";
import ProgCurrentStatus from "../Infos/ProgCurrentStatus";

const UserProgramCard = ({program, loadPrograms}) => {
    const navigate = useNavigate();

    const {user} = useAuth();

    const handleCancelBtn = async (id) => {
        if (window.confirm('프로그램 신청을 취소합니다')) {
            await cancelRegister();
            loadPrograms();
        }
    }

    const handleInfoBtn = (pgIdx) => {
        navigate('../program-info/' + pgIdx)
    }

    const handleRegisterBtn = async ({pgIdx, pgComIdx}) => {
        if (window.confirm(`[${program.pgTitle}] 프로그램을 신청합니다`)) {
            await registerProgram(pgIdx, pgComIdx);
            window.location.href = '/user/user-profile';
        }
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
                {user.pgIdx
                    ?
                    user.pgIdx === program.pgIdx
                        ?
                        <Button color="danger" onClick={() => handleCancelBtn(program.pgIdx)}>신청취소</Button>
                        :
                        <Button disabled onClick={() => handleRegisterBtn(program)}>신청하기</Button>
                    :
                    <Button onClick={() => handleRegisterBtn(program)}>신청하기</Button>
                }

            </CardFooter>
        </Card>
    );
};

export default UserProgramCard;