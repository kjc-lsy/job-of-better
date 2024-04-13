import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {useAuth} from "../../contexts/AuthContextProvider";
import {getWaitingRegDto} from "../../apis/program";
import CancelSubmitBtn from "../../components/Buttons/CancelSubmitBtn";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const WaitingReg = () => {
    const {isLogin} = useAuth();
    const [waitingRegDto, setWaitingRegDto] = useState({});
    useEffect(() => {
        if(isLogin) {
            getWaitingRegDto().then(res => {
                setWaitingRegDto(res.data)
            })

        }
    }, [isLogin]);

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
                                <p>담당자가 프로그램 신청을 검토 중입니다.</p>
                                <p>24시간 내에 연락이 없을 경우, 아래 연락처로 문의해 주시기 바랍니다.</p>
                            </Col>
                        </Row>
                        <Row className="text-center waiting-info">
                            <Col>
                                <FontAwesomeIcon icon={faPhone} />
                                <p>{waitingRegDto.comPhone?.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</p>
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <p>{waitingRegDto.comEmail}</p>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col className="text-center">
                                <CancelSubmitBtn/>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        </Row>
    );
};

export default WaitingReg;