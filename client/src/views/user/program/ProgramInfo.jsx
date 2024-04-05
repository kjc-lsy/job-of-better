import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import {Viewer} from "@toast-ui/react-editor";
import {useAuth} from "../../../contexts/AuthContextProvider";
import {format} from "date-fns";
import {getComNameByComIdx, getProgram, registerProgram} from "../../../apis/program";
import ProgramDateInfos from "../../../components/Infos/ProgramDateInfos";

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

                getComNameByComIdx(fetchedProgram.pgComIdx).then((response) => {
                    setComName(response.data);
                })
            });
        }
    }, [isLogin]);

    const handleSubmitBtn = async ({pgIdx, pgComIdx}) => {
        if (window.confirm(`[${program.pgTitle}] 프로그램을 신청합니다`)) {
            await registerProgram(pgIdx, pgComIdx);
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
                        handleSubmitBtn(program)
                    }}>신청하기</Button>
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
                                <Row>
                                    <Col>
                                        <label>AI 교육요약</label>
                                        <div className="form-control">{program ? program.pgContentSummary : null}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col>
                            <ProgramDateInfos program={program}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='program-title'>
                                <span>프로그램 내용</span>
                            </div>
                            <div className='program-content'>
                                <Viewer
                                    key={program ? program.pgContent : null}
                                    initialValue={program ? program.pgContent : null}
                                />
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProgramInfo;