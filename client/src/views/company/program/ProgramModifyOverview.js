import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {getProgram, updateProgram} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";
import ProgDateRangePicker from "../../../components/ProgDateRangePicker";
import TimeRange30Picker from "../../../components/TimeRange30Picker";

const ProgramModifyOverview = () => {
    const {pgIdx} = useParams();
    const [program, setProgram] = useState({});
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const {isLogin} = useAuth();
    const [inputValue, setInputValue] = useState({
        pgProgStartDate: null,
        pgProgEndDate: null,
        pgEduStartDate: null,
        pgEduEndDate: null,
        pgRegValStartDate: null,
        pgRegValEndDate: null,
        pgInterviewValStartDate: null,
        pgInterviewValEndDate: null,
        pgInterviewValStartTime: null,
        pgInterviewValEndTime: null,
        pgTitle: '',
        pgContent: '',
    });

    useEffect(() => {
        if(isLogin) {
            getProgram(pgIdx).then((response) => {
                const fetchedProgram = response.data;

                Object.keys(fetchedProgram).forEach(key => {
                    if (key.includes('Date') || key.includes('Time')) {
                        fetchedProgram[key] = fetchedProgram[key] ? new Date(fetchedProgram[key]) : null;
                    }
                });

                setProgram(fetchedProgram);
                setTitle(fetchedProgram.pgTitle);
            });
        }
    }, [isLogin, pgIdx]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProgram(program.pgIdx, title);
            alert(response.data)
            navigate('/company/program-info/' + program.pgIdx)
        } catch (e) {
            alert(e.response.data)
            console.log(e)
        }
    }

    const handleProgDate = (values) => {
        if(values === null) {
            setInputValue({...inputValue, pgProgStartDate: null, pgProgEndDate: null});
            return;
        }

        const [startDate, endDate] = values;
        setInputValue({...inputValue, pgProgStartDate: startDate, pgProgEndDate: endDate});
    }

    const handleEduDate = (values) => {
        if(values === null) {
            setInputValue({...inputValue, pgEduStartDate: null, pgEduEndDate: null});
            return;
        }

        const [startDate, endDate] = values;
        setInputValue({...inputValue, pgEduStartDate: startDate, pgEduEndDate: endDate});
    }

    const handleRegValDate = (values) => {
        if(values === null) {
            setInputValue({...inputValue, pgRegValStartDate: null, pgRegValEndDate: null});
            return;
        }

        const [startDate, endDate] = values;
        setInputValue({...inputValue, pgRegValStartDate: startDate, pgRegValEndDate: endDate});
    }

    const handleInterviewValDate = (values) => {
        if(values === null) {
            setInputValue({...inputValue, pgInterviewValStartDate: null, pgInterviewValEndDate: null});
            return;
        }

        const [startDate, endDate] = values;
        setInputValue({...inputValue, pgInterviewValStartDate: startDate, pgInterviewValEndDate: endDate});
    }

    const handleInterviewValTime = (values) => {
        if(values === null) {
            setInputValue({...inputValue, pgInterviewValStartTime: null, pgInterviewValEndTime: null});
            return;
        }

        const [startTime, endTime] = values;
        setInputValue({...inputValue, pgInterviewValStartTime: startTime, pgInterviewValEndTime: endTime});
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
                                            value={[program.pgProgStartDate, program.pgProgEndDate]}
                                            onChange={handleProgDate}
                                        />
                                        <label>교육 진행 기간</label>
                                        <ProgDateRangePicker
                                            value={[program.pgEduStartDate, program.pgEduEndDate]}
                                            onChange={handleEduDate}
                                        />
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <h4>학생모집 기간</h4>
                                    <div>
                                        <label>신청 가능 기간</label>
                                        <ProgDateRangePicker
                                            value={[program.pgRegValStartDate, program.pgRegValEndDate]}
                                            onChange={handleRegValDate}
                                        />
                                        <label>면접 가능 기간</label>
                                        <ProgDateRangePicker
                                            value={[program.pgInterviewValStartDate, program.pgInterviewValEndDate]}
                                            onChange={handleInterviewValDate}
                                        />
                                        <label>면접 가능 시간</label>
                                        <TimeRange30Picker
                                            value={[program.pgInterviewValStartTime, program.pgInterviewValEndTime]}
                                            onChange={handleInterviewValTime}
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