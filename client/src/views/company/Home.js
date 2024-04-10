
import React from "react";
import {Card, Col, Row} from "reactstrap";

function Home(props) {
    return (
            <div className="content">
                <Row>
                    <Col md="3">
                        <Card>
                            <span>프로그램 신청자 수</span>
                            <h3>총 신청자 수</h3>
                            <p>30명</p>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card>
                            <span>최종면접 신청자 수</span>
                            <h3>면접자 수</h3>
                            <p>30명</p>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card>
                            <span>전체 탈락자 수</span>
                            <h3>탈락자 수</h3>
                            <p>30명</p>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card>
                            <span>현재 교육 진행자 수</span>
                            <h3>교육자 수</h3>
                            <p>30명</p>
                        </Card>
                    </Col>
                </Row>
            </div>
    );
}

export default Home;
