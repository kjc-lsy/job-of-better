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
    );
};

export default InterviewCard;