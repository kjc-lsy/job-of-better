import React from 'react';
import {Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {List} from "rsuite";

const InterviewCard = () => {

    return (
        <Card className="interview-card">
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
                                              보류
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
                        <List.Item className="date_list">
                            <div className="date"> </div>
                            <div className="time">
                                <ul>
                                    <li>04/15</li>
                                    <li>04/16</li>
                                    <li>04/17</li>
                                    <li>04/18</li>
                                    <li>04/19</li>
                                </ul>
                            </div>
                        </List.Item>
                        <List.Item className="time_list">
                            <div className="date">09 : 00</div>
                            <div className="time">
                                <ul>
                                    <li>
                                        <ButtonGroup
                                            className="btn-group-toggle"
                                            data-toggle="buttons"
                                        >
                                            <Button
                                                tag="label"
                                                className="btn-simple btn btn-info btn-sm approved"
                                            >
                                                김민지
                                            </Button>
                                            <Button
                                                tag="label"
                                                className="btn-simple btn btn-info btn-sm apply"
                                            >
                                                김민지
                                            </Button>
                                        </ButtonGroup>
                                    </li>
                                    <li></li>
                                    <li></li>
                                    <li>
                                        <ButtonGroup
                                            className="btn-group-toggle"
                                            data-toggle="buttons"
                                        >
                                            <Button
                                                tag="label"
                                                className="btn-simple btn btn-info btn-sm duplicate"
                                            >
                                                김민지
                                            </Button>
                                            <Button
                                                tag="label"
                                                className="btn-simple btn btn-info btn-sm duplicate"
                                            >
                                                김민지
                                            </Button>
                                        </ButtonGroup>
                                    </li>
                                    <li></li>
                                </ul>
                            </div>
                        </List.Item>
                        <List.Item className="time_list">
                            <div className="date">10 : 00</div>
                            <div className="time">
                                <ul>
                                    <li>
                                    </li>
                                    <li></li>
                                    <li>
                                        <ButtonGroup
                                            className="btn-group-toggle"
                                            data-toggle="buttons"
                                        >
                                            <Button
                                                tag="label"
                                                className="btn-simple btn btn-info btn-sm duplicate"
                                            >
                                                김민지
                                            </Button>
                                        </ButtonGroup>
                                    </li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </List.Item>
                    </List>
                </div>
            </CardBody>
        </Card>
    );
};

export default InterviewCard;