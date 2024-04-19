import React from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Line, Pie} from "react-chartjs-2";
import {chartExample4, pieChart} from "../../variables/charts";
import {useCurrProg} from "../../contexts/CurrProgProvider";
import InterviewCard from "../../components/Card/InterviewCard";

function Home(props) {
    const {currProg} = useCurrProg();
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
                    <InterviewCard/>
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
                                <Pie
                                    data={pieChart.data}
                                    options={pieChart.options}
                                    width="400px"
                                    height="200px"
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
                                <Pie
                                    data={pieChart.data}
                                    options={pieChart.options}
                                    width="400px"
                                    height="200px"
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
