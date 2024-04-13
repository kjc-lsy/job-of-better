import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import ProgramCardHeader from "./ProgramCardHeader";
import {Viewer} from "@toast-ui/react-editor";
import ProgCurrentStatus from "../Infos/ProgCurrentStatus";
import RegSubmitBtn from "../Buttons/RegSubmitBtn";

const UserProgramCard = ({program, loadPrograms}) => {
    const navigate = useNavigate();

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
                <RegSubmitBtn program={program}/>
            </CardFooter>
        </Card>
    );
};

export default UserProgramCard;