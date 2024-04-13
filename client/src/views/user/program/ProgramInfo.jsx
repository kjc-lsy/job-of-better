import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import {Viewer} from "@toast-ui/react-editor";
import {useAuth} from "../../../contexts/AuthContextProvider";
import {format} from "date-fns";
import {getComNameByComIdx, getProgram} from "../../../apis/program";
import ProgCurrentStatus from "../../../components/Infos/ProgCurrentStatus";
import ProgDateInfos from "../../../components/Infos/ProgDateInfos";
import RegSubmitBtn from "../../../components/Buttons/RegSubmitBtn";

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

    return (
        <div className="content program">
            <Card className='program-info'>
                <CardHeader>
                    <div className="program-info-tt">
                        <span className="company-name">{comName}</span>
                        <CardTitle tag="h1">{program ? program.pgTitle : null}</CardTitle>
                        <CardSubtitle>{program ? "등록일 : " + format(program.pgModifiedDate, 'yyyy-MM-dd') + " | 수정일: " + format(program.pgModifiedDate, 'yyyy-MM-dd') : null}</CardSubtitle>
                    </div>
                    <RegSubmitBtn program={program}/>
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
                                        <ProgCurrentStatus
                                            program={program}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>AI 교육요약</label>
                                        <div className="form-control">
                                            <Viewer
                                                key={program ? program.pgContentSummary : null}
                                                initialValue={program ? program.pgContentSummary : ""}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col>
                            <ProgDateInfos program={program}/>
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