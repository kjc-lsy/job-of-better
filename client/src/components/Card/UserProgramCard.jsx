import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, Row} from "reactstrap";
import {deleteProgram} from "../../apis/program";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContextProvider";
import ProgramCardHeader from "./ProgramCardHeader";

const UserProgramCard = ({program, loadPrograms}) => {
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
                        <label>교육내용</label>
                        <div className="form-control">짧은 교육내용 요약을 여기에 입력</div>
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

export default UserProgramCard;