import React, {useEffect, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

// reactstrap components
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Input, Row,} from "reactstrap";
import {deleteProgram, getPrograms} from "../../apis/program";
import {useAuth} from "../../contexts/AuthContextProvider";
import {useNavigate} from "react-router-dom";


function Program() {
    const {isLogin} = useAuth();
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

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

    return (
        <div className="content">
            <Row>
                {programs.map((program, index) => {
                    return (
                        <Col md="6" key={index}>
                            <Card className="program-info">
                                <CardHeader>
                                    <h5 className="card-category"></h5>
                                    <CardTitle tag="h3">{program.pgTitle}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col  md="6">
                                            <label>수정일</label>
                                            <Input
                                                defaultValue={program.pgModifiedDate.replace('T', ' ')}
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </Col>
                                        <Col  md="6">
                                            <label>등록일</label>
                                            <Input
                                                defaultValue={program.pgRegistrationDate.replace('T', ' ')}
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <label>교육기간</label>
                                            <Input
                                                defaultValue="???"
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </Col>
                                        <Col md="6">
                                            <label>신청기간</label>
                                            <Input
                                                defaultValue="???"
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="7">
                                            <label>장소</label>
                                            <Input
                                                defaultValue="???"
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </Col>
                                        <Col md="5">
                                            <label>대상</label>
                                            <Input
                                                defaultValue="???"
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="10">
                                            <label>기타 사항</label>
                                            <Input
                                                cols="80"
                                                defaultValue="???"
                                                placeholder=""
                                                rows="4"
                                                type="textarea"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter >
                                    <Button>수정</Button>
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
