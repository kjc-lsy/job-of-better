import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {getProgram, updateProgram} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";
import ProgDateRangePicker from "../../../components/ProgDateRangePicker";
import TimeRange30Picker from "../../../components/TimeRange30Picker";

const ProgramModifyOverview = () => {
    const {pgIdx} = useParams();
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const {isLogin} = useAuth();
    const [progDateRange, setProgDateRange] = useState([null,null]);
    const [eduDateRange, setEduDateRange] = useState([null,null]);
    const [regValDateRange, setRegValDateRange] = useState([null,null]);
    const [interviewValDateRange, setInterviewValDateRange] = useState([null,null]);
    const [interviewValTimeRange, setInterviewValTimeRange] = useState([null,null]);

    useEffect(() => {
        if (isLogin) {
            getProgram(pgIdx).then((response) => {
                const fetchedProgram = response.data;

                setTitle(fetchedProgram.pgTitle);

                setProgDateRange([
                    fetchedProgram.pgProgStartDate ? new Date(fetchedProgram.pgProgStartDate) : null,
                    fetchedProgram.pgProgEndDate ? new Date(fetchedProgram.pgProgEndDate) : null
                ]);
                setEduDateRange([
                    fetchedProgram.pgEduStartDate ? new Date(fetchedProgram.pgEduStartDate) : null,
                    fetchedProgram.pgEduEndDate ? new Date(fetchedProgram.pgEduEndDate) : null
                ]);
                setRegValDateRange([
                    fetchedProgram.pgRegValStartDate ? new Date(fetchedProgram.pgRegValStartDate) : null,
                    fetchedProgram.pgRegValEndDate ? new Date(fetchedProgram.pgRegValEndDate) : null
                ]);
                setInterviewValDateRange([
                    fetchedProgram.pgInterviewValStartDate ? new Date(fetchedProgram.pgInterviewValStartDate) : null,
                    fetchedProgram.pgInterviewValEndDate ? new Date(fetchedProgram.pgInterviewValEndDate) : null
                ]);
                setInterviewValTimeRange([
                    fetchedProgram.pgInterviewValStartTime ? new Date(fetchedProgram.pgInterviewValStartTime) : null,
                    fetchedProgram.pgInterviewValEndTime ? new Date(fetchedProgram.pgInterviewValEndTime) : null
                ]);
            });
        }
    }, [isLogin]);

    useEffect(() => {
        console.log(progDateRange)
    }, [progDateRange]);

    const addNineHours = (date) => {
        if (!date) return null; // date가 null이거나 undefined인 경우, null을 반환
        const newDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // 9시간을 밀리초로 환산하여 더함
        return newDate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProgram({
                pgProgStartDate: addNineHours(progDateRange[0]),
                pgProgEndDate: addNineHours(progDateRange[1]),
                pgEduStartDate: addNineHours(eduDateRange[0]),
                pgEduEndDate: addNineHours(eduDateRange[1]),
                pgRegValStartDate: addNineHours(regValDateRange[0]),
                pgRegValEndDate: addNineHours(regValDateRange[1]),
                pgInterviewValStartDate: addNineHours(interviewValDateRange[0]),
                pgInterviewValEndDate: addNineHours(interviewValDateRange[1]),
                pgInterviewValStartTime: addNineHours(interviewValTimeRange[0]),
                pgInterviewValEndTime: addNineHours(interviewValTimeRange[1]),
                pgTitle: title,
                pgIdx: pgIdx
            });
            alert(response.data)
            navigate('/company/program-info/' + pgIdx)
        } catch (e) {
            alert(e.response.data)
            console.log(e)
        }
    }

    return (
        <div className="content">
            <Card className="program-enroll">
                <CardHeader>
                    <CardTitle tag="h3">프로그램 정보 수정</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <h4>프로그램 제목</h4>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md='6' className='mb-4 mb-md-0'>
                                    <h4>프로그램 기간</h4>
                                    <div>
                                        <label>전체 프로그램 기간</label>
                                        <ProgDateRangePicker
                                            value={progDateRange}
                                            onChange={setProgDateRange}
                                        />
                                        <label>교육 진행 기간</label>
                                        <ProgDateRangePicker
                                            value={eduDateRange}
                                            onChange={setEduDateRange}
                                        />
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <h4>학생모집 기간</h4>
                                    <div>
                                        <label>신청 가능 기간</label>
                                        <ProgDateRangePicker
                                            value={regValDateRange}
                                            onChange={setRegValDateRange}
                                        />
                                        <label>면접 가능 기간</label>
                                        <ProgDateRangePicker
                                            value={interviewValDateRange}
                                            onChange={setInterviewValDateRange}
                                        />
                                        <label>면접 가능 시간</label>
                                        <TimeRange30Picker
                                            value={interviewValTimeRange}
                                            onChange={setInterviewValTimeRange}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Button type="submit">수정완료</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProgramModifyOverview;