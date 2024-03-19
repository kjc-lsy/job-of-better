import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Viewer} from "@toast-ui/react-editor";
import {ThemeContext} from "../../../contexts/ThemeWrapper";
import {getProgram} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";

const ProgramInfo = () => {
    const {pgIdx} = useParams();
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();
    const {isLogin} = useAuth();

    const [program, setProgram] = useState({
        pgIdx: null,
        pgComIdx: null,
        pgTitle: '',
        pgContent: '',
        pgInterviewDate: '',
        pgRegistrationDate: '',
        pgModifiedDate: '',
    });
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (isLogin) {
            getProgram(pgIdx).then((response) => {
                const fetchedProgram = response.data;
                setProgram(fetchedProgram);
            });
        }
    }, [isLogin]);

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
                    <CardTitle tag="h1">프로그램 상세정보</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className='program-title'>
                        프로그램 정보
                    </div>
                    <div className='program-content'>
                        <Row>
                            <Col>
                                <label>프로그램 제목</label>
                                <h4>{program.pgTitle}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <label>등록일</label>
                                <h4>{program.pgModifiedDate.replace('T', ' ')}</h4>
                            </Col>
                            <Col md="6">
                                <label>수정일</label>
                                <h4>{program.pgModifiedDate.replace('T', ' ')}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <label>신청기간</label>
                                <h4>2024.01.01 ~ 2024.01.01</h4>
                            </Col>
                            <Col md="6">
                                <label>교육기간</label>
                                <h4>2024.01.01 ~ 2024.01.01</h4>
                            </Col>
                        </Row>
                    </div>
                    <Button onClick={() => handleModifyOvrBtn(program.pgIdx)}>수정하기</Button>

                    <div className='program-title'>프로그램 내용</div>
                    <div className='program-content'>
                        <Viewer
                            key={program.pgContent}
                            initialValue={program.pgContent}
                        />
                    </div>
                    <Button onClick={() => handleModifyContBtn(program.pgIdx)}>수정하기</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProgramInfo;