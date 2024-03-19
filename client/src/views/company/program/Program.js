import React, {useEffect, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

// reactstrap components
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row,} from "reactstrap";
import {deleteProgram, getPrograms} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";
import {useNavigate, useParams} from "react-router-dom";


function Program() {
    const {isLogin} = useAuth();
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();
    const {pgIdx} = useParams();

    // 로그인 처리가 완료 되면 그 이후에 함수를 실행
    useEffect(() => {
        if (isLogin) {
            loadPrograms();
        }
    }, [isLogin]);

    const loadPrograms = async () => {
        const response = await getPrograms();
        setPrograms(response.data);
    }

    const handleDeleteBtn = async (id) => {
        if (window.confirm('프로그램을 삭제합니다')) {
            await deleteProgram(id);
            loadPrograms();
        }
    }

    const handleAddBtn = () => {
        navigate('/company/program-insert')
    }

    const handleInfoBtn = (pgIdx) => {
        navigate('/company/program-info/' + pgIdx)
    }

    return (
        <div className="content">
            <Row>
                {programs.map((program, index) => {
                    return (
                        <Col md="6" key={index}>
                            <Card className="program">
                                <CardHeader>
                                    <span className="company-name">AddinEdu</span>
                                    <CardTitle tag="h1">{program.pgTitle}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <label>현재상태</label>
                                            <h2>면접 진행중</h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='4'>
                                            <label>총 신청 수</label>
                                            <h3>9명</h3>
                                        </Col>
                                        <Col md='4'>
                                            <label>면접 참여 수</label>
                                            <h3>6명</h3>
                                        </Col>
                                        <Col md='4'>
                                            <label>합격자 수</label>
                                            <h3>4명</h3>
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
                                <CardFooter >
                                    <Button onClick={() => handleInfoBtn(program.pgIdx)}>상세정보</Button>
                                    <Button onClick={() => handleDeleteBtn(program.pgIdx)}>삭제</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    )
                })}
                <Col md="6" className="text-center">
                    <Card>
                        <Button onClick={handleAddBtn}>+</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Program;
