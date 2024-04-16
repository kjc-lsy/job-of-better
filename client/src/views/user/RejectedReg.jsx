import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {getWaitingRegDto} from "../../apis/program";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

const WaitingReg = () => {
    const [waitingRegDto, setWaitingRegDto] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        getWaitingRegDto().then(res => {
            setWaitingRegDto(res.data)
        })
    }, []);

    return (
        <Row className="content waiting-reg">
            <Col md={4}>
                <Card>
                    <CardHeader>
                        <span>{waitingRegDto?.comName}</span>
                        <CardTitle tag="h3">{waitingRegDto?.pgTitle}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <p>프로그램 신청이 거절 되었습니다</p>
                                <p>24시간 내에 연락이 없을 경우, 아래 연락처로 문의해 주시기 바랍니다</p>
                            </Col>
                        </Row>
                        <Row className="text-center waiting-info">
                            <Col>
                                <FontAwesomeIcon icon={faPhone}/>
                                <p>{waitingRegDto.comPhone?.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</p>
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faEnvelope}/>
                                <p>{waitingRegDto.comEmail}</p>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col className="text-center">
                                <Button onClick={()=> navigate('/user/program')}>프로그램 다시선택</Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        </Row>
    );
};

export default WaitingReg;