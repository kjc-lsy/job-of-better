import React from 'react';
import {Col, Row, Table} from "reactstrap";
import {format} from "date-fns";

const ProgramDateInfos = ({program}) => {

    return (
        <>
            <div className='program-title'>
                <span>기간 정보</span>
            </div>
            <div className='program-content'>
                <label>프로그램 기간</label>
                <Table>
                    <tbody>
                    <tr>
                        <th>전체 프로그램 기간</th>
                        <td>
                            <Row>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">시작일</label>
                                        <h4>{program ? format(program.pgProgStartDate, 'yyyy-MM-dd') : null}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">종료일</label>
                                        <h4>{program ? format(program.pgProgEndDate, 'yyyy-MM-dd') : null}</h4>
                                    </div>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    <tr>
                        <th>교육 진행 기간</th>
                        <td>
                            <Row>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">시작일</label>
                                        <h4>{program ? format(program.pgEduStartDate, 'yyyy-MM-dd') : null}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className=""><label htmlFor="">종료일</label>
                                        <h4>{program ? format(program.pgEduEndDate, 'yyyy-MM-dd') : null}</h4>
                                    </div>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    <tr>
                        <th>신청 가능 기간</th>
                        <td>
                            <Row>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">시작일</label>
                                        <h4>{program ? format(program.pgRegValStartDate, 'yyyy-MM-dd') : null}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">종료일</label>
                                        <h4>{program ? format(program.pgRegValEndDate, 'yyyy-MM-dd') : null}</h4>
                                    </div>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <label>면접 기간</label>
                <Table>
                    <tbody>
                    <tr>
                        <th>면접 가능 기간</th>
                        <td>
                            <Row>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">시작일</label>
                                        <h4>{program ? format(program.pgInterviewValStartDate, 'yyyy-MM-dd') : null}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className=""><label htmlFor="">종료일</label>
                                        <h4>{program ? format(program.pgInterviewValEndDate, 'yyyy-MM-dd') : null}</h4>
                                    </div>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    <tr>
                        <th>면접 가능 시간</th>
                        <td>
                            <Row>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">시작시간</label>
                                        <h4>{program ? (program.pgInterviewValStartTime ? program.pgInterviewValStartTime.substr(0, 5) : "시작 시간이 설정되지 않았습니다.") : null}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">종료시간</label>
                                        <h4>{program ? (program.pgInterviewValEndTime ? program.pgInterviewValEndTime.substr(0, 5) : "시작 시간이 설정되지 않았습니다.") : null}</h4>
                                    </div>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ProgramDateInfos;