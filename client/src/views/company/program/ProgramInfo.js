import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, Row, Table} from "reactstrap";
import {Viewer} from "@toast-ui/react-editor";
import {getProgram} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";
import {format} from "date-fns";

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

    useEffect(() => {
        console.log(program)
    }, [program]);

    const handleModifyOvrBtn = (pgIdx) => {
        navigate('/company/program-modify-overview/' + pgIdx)
    }

    const handleModifyContBtn = (pgIdx) => {
        navigate('/company/program-modify-content/' + pgIdx)
    }

    return (
        <div className="content">
            <Card className='program-info'>
                <CardHeader>
                    <CardTitle tag="h1">{program ? program.pgTitle : null}</CardTitle>
                    <CardSubtitle>{program ? "등록일 : " + format(program.pgModifiedDate, 'yyyy-MM-dd') + ", 수정일: " + format(program.pgModifiedDate, 'yyyy-MM-dd') : null}</CardSubtitle>
                    <Button onClick={() => handleModifyOvrBtn(pgIdx)}>수정하기</Button>
                    <Button onClick={() => handleModifyContBtn(pgIdx)}>수정하기</Button>
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
                                        <div className="h3">면접 진행중</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <img src="" alt="이미지 넣기"/>
                                            </Col>
                                            <Col>
                                                <label>총 참여자 수</label>
                                                <div className="h3">9명</div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <img src="" alt="이미지 넣기"/>
                                            </Col>
                                            <Col>
                                                <label>면접 참여 수</label>
                                                <div className="h3">9명</div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <img src="" alt="이미지 넣기"/>
                                            </Col>
                                            <Col>
                                                <label>미확인 수</label>
                                                <div className="h3">9명</div>
                                            </Col>
                                        </Row>
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
                                </Table>
                                <Table>
                                    <label>면접 기간</label>
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
                                                        <h4>{program ? program.pgInterviewValStartTime.substr(0, 5) : null}</h4>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="">종료시간</label>
                                                        <h4>{program ? program.pgInterviewValEndTime.substr(0,5) : null}</h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
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