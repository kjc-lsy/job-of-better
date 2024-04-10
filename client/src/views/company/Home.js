import React from "react";
import {ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row, Button} from "reactstrap";
import {List} from "rsuite";
import {Line} from "react-chartjs-2";
import {chartExample2, chartExample4} from "../../variables/charts";
import classNames from "classnames";

function Home(props) {
    return (
        <div className="content">
            <ButtonGroup
                className="btn-group-toggle"
                data-toggle="buttons"
            >
                <Button
                    tag="label"
                    color="info"
                    id="0"
                    size="sm"
                >
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">프로그램1</span>
                </Button>
            </ButtonGroup>
            <Row className="home_top">
                <Col lg="3">
                    <Card>
                        <CardHeader>
                            <h5 className="card-category">프로그램 신청자 수</h5>
                            <CardTitle tag="h3">
                                총 신청자 수
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            30명
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card>
                        <CardHeader>
                            <h5 className="card-category">최종면접 신청자 수</h5>
                            <CardTitle tag="h3">
                                면접자 수
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            30명
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card>
                        <CardHeader>
                            <h5 className="card-category">전체 탈락자 수</h5>
                            <CardTitle tag="h3">
                                <h3>탈락자 수</h3>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            30명
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card>
                        <CardHeader>
                            <h5 className="card-category">현재 교육 진행자 수</h5>
                            <CardTitle tag="h3">
                                <h3>교육자 수</h3>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            30명
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="home_time">
                <Col lg={12}>
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col className="text-left" sm="6">
                                    <h5 className="card-category">interview Time Data</h5>
                                    <CardTitle tag="h2">시간대별 면접자 현황</CardTitle>
                                </Col>
                                <Col sm="6">
                                    <ul>
                                        <li className="blue"><a>확정</a></li>
                                        <li className="white"><a>신청</a></li>
                                        <li className="red"><a>중복</a></li>
                                    </ul>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <div className="chart-area">
                                <List>
                                    <List.Item>
                                        <div className="date">04/15</div>
                                        <div className="time">
                                            <ul>
                                                <li className="blue">김민지 15:00</li>
                                                <li className="white">김민지 15:00</li>
                                                <li className="red">김민지 15:00</li>
                                                <li className="red">김민지 15:00</li>
                                                <li className="red">김민지 15:00</li>
                                            </ul>
                                        </div>
                                    </List.Item>
                                </List>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="home_chart">
                <Col lg="4">
                    <Card className="card-chart">
                        <CardHeader>
                            <h5 className="card-category">Cover Letter</h5>
                            <CardTitle tag="h3">
                                자기소개서
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="chart-area">
                                <Line
                                    data={chartExample4.data}
                                    options={chartExample4.options}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card className="card-chart">
                        <CardHeader>
                            <h5 className="card-category">Resume</h5>
                            <CardTitle tag="h3">
                                이력서
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="chart-area">
                                <Line
                                    data={chartExample4.data}
                                    options={chartExample4.options}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card className="card-chart">
                        <CardHeader>
                            <h5 className="card-category">Daily application count</h5>
                            <CardTitle tag="h3">
                                일별 신청사 수
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="chart-area">
                                <Line
                                    data={chartExample4.data}
                                    options={chartExample4.options}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Home;
