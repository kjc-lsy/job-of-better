import React, {useEffect, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

// reactstrap components
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row,} from "reactstrap";
import {deleteProgram, getPrograms} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";
import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck, faUserClock, faUsers} from "@fortawesome/free-solid-svg-icons";
import programAddImg from "../../../assets/img/program-add.png";


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
        <div className="content program">
            <Row>
                {programs.map((program, index) => {
                    return (
                        <Col md="6" key={index}>
                            <Card>
                                <CardHeader>
                                    <span className="company-name">AddinEdu</span>
                                    <CardTitle tag="h1">{program.pgTitle}</CardTitle>
                                </CardHeader>
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
                                            <label>총 참여자 수</label>
                                            <div className="num-info">9명</div>
                                        </Col>
                                        <Col md='3'>
                                            <div>
                                                <FontAwesomeIcon icon={faUserCheck}/>
                                            </div>
                                            <label>면접 참여 수</label>
                                            <div className="num-info">6명</div>
                                        </Col>
                                        <Col md='3'>
                                            <div>
                                                <FontAwesomeIcon icon={faUserClock}/>
                                            </div>
                                            <label>미확인 수</label>
                                            <div className="num-info">4명</div>
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
                    <Card className="program-add">
                        <Button onClick={handleAddBtn}>
                            <img src={programAddImg} alt="프로그램 추가"/>
                            <div>학생들을 모집, 교육할 프로그램을 기획해주세요</div>
                            <Button className="inner-btn">프로그램 추가</Button>
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Program;
