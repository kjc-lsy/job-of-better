import React from 'react';
import {Col, Row, Table} from "reactstrap";

const ProgDateInfos = ({program}) => {

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
                                        <h4>{program?.pgProgStartDate || "시작일이 설정되지 않았습니다"}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">종료일</label>
                                        <h4>{program?.pgProgEndDate || "종료일이 설정되지 않았습니다"}</h4>
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
                                        <h4>{program?.pgRegValStartDate || "시작일이 설정되지 않았습니다"}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">종료일</label>
                                        <h4>{program?.pgRegValEndDate || "종료일이 설정되지 않았습니다"}</h4>
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
                                        <h4>{program?.pgEduStartDate || "시작일이 설정되지 않았습니다"}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className=""><label htmlFor="">종료일</label>
                                        <h4>{program?.pgEduEndDate || "종료일이 설정되지 않았습니다"}</h4>
                                    </div>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <label>면접 정보</label>
                <Table>
                    <tbody>
                    <tr>
                        <th>면접 가능 기간</th>
                        <td>
                            <Row>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">시작일</label>
                                        <h4>{program?.pgInterviewValStartDate || "시작일이 설정되지 않았습니다"}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className=""><label htmlFor="">종료일</label>
                                        <h4>{program?.pgInterviewValEndDate || "종료일이 설정되지 않았습니다"}</h4>
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
                                        <h4>{program?.pgInterviewValStartTime?.substring(0,5) || "시작 시간이 설정되지 않았습니다"}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">종료시간</label>
                                        <h4>{program?.pgInterviewValEndTime?.substring(0,5) || "종료 시간이 설정되지 않았습니다"}</h4>
                                    </div>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    <tr>
                        <th>면접 상세</th>
                        <td>
                            <Row>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">면접당 최대 인원</label>
                                        <h4>{program?.pgMaxIntervieweesPerUnit || "최대 인원이 설정되지 않았습니다"}</h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="">
                                        <label htmlFor="">면접 단위 시간</label>
                                        <h4>{program?.pgInterviewUnitTime || "면접 단위 시간이 설정되지 않았습니다"}</h4>
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

export default ProgDateInfos;