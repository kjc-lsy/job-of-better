import React from "react";
import {ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row, Button} from "reactstrap";
import {List} from "rsuite";
import {Line} from "react-chartjs-2";
import {chartExample2, chartExample4} from "../../variables/charts";
import classNames from "classnames";

function Home(props) {
    return (
        <div className="content">
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
                            <span>30</span>명
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
                            <span>30</span>명
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card>
                        <CardHeader>
                            <h5 className="card-category">전체 탈락자 수</h5>
                            <CardTitle tag="h3">
                                탈락자 수
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <span>30</span>명
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card>
                        <CardHeader>
                            <h5 className="card-category">현재 교육 진행자 수</h5>
                            <CardTitle tag="h3">
                                교육자 수
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <span>30</span>명
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
                                    <ButtonGroup
                                        className="btn-group-toggle float-right"
                                        data-toggle="buttons"
                                    >
                                        <Button
                                            tag="label"
                                            className="btn-simple btn btn-info btn-sm approved"
                                        >
                                            <span className="">
                                              확정
                                            </span>
                                            <span className="d-block d-sm-none">
                                              <i className="tim-icons icon-single-02"/>
                                            </span>
                                        </Button>
                                        <Button
                                            tag="label"
                                            className="btn-simple btn btn-info btn-sm apply"
                                        >
                                            <span className="">
                                              신청
                                            </span>
                                            <span className="d-block d-sm-none">
                                              <i className="tim-icons icon-single-02"/>
                                            </span>
                                        </Button>
                                        <Button
                                            tag="label"
                                            className="btn-simple btn btn-info btn-sm duplicate"
                                        >
                                            <span className="">
                                              중복
                                            </span>
                                            <span className="d-block d-sm-none">
                                              <i className="tim-icons icon-single-02"/>
                                            </span>
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <div className="chart-area">
                                <List>
                                    <List.Item className="time_list">
                                        <div className="date">04/15</div>
                                        <div className="time">
                                            <ButtonGroup
                                                className="btn-group-toggle float-right"
                                                data-toggle="buttons"
                                            >
                                                <Button
                                                    tag="label"
                                                    className="btn-simple btn btn-info btn-sm approved"
                                                >
                                                    김민지 10:00
                                                </Button>
                                                <Button
                                                    tag="label"
                                                    className="btn-simple btn btn-info btn-sm apply"
                                                >
                                                    김민지 11:00
                                                </Button>
                                                <Button
                                                    tag="label"
                                                    className="btn-simple btn btn-info btn-sm duplicate"
                                                >
                                                    김민지 12:00
                                                </Button>
                                                <Button
                                                    tag="label"
                                                    className="btn-simple btn btn-info btn-sm duplicate"
                                                >
                                                    김민지 12:00
                                                </Button>
                                            </ButtonGroup>
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
                                일별 신청자 수
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
