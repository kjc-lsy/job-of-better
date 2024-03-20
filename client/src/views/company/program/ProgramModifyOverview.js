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
    const [progDateRange, setProgDateRange] = useState([null,null]);
    const [eduDateRange, setEduDateRange] = useState([null,null]);
    const [regValDateRange, setRegValDateRange] = useState([null,null]);
    const [interviewValDateRange, setInterviewValDateRange] = useState([null,null]);
    const [interviewValTimeRange, setInterviewValTimeRange] = useState([null,null]);

    useEffect(() => {
        console.log(inputValue)
    }, [inputValue]);

    useEffect(() => {
        if (isLogin) {
            getProgram(pgIdx).then((response) => {
                const fetchedProgram = response.data;

                setTitle(fetchedProgram.pgTitle);
                setInputValue({ ...fetchedProgram });

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
    }, [isLogin, pgIdx]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProgram(inputValue);
            alert(response.data)
            navigate('/company/program-info/' + pgIdx)
        } catch (e) {
            alert(e.response.data)
            console.log(e)
        }
    }

    const handleProgDate = (values) => {
        setProgDateRange(values);

        if(values !== null) {
            setInputValue({...inputValue, pgProgStartDate: values[0], pgProgEndDate: values[1]});
        }
    }

    const handleEduDate = (values) => {
        setEduDateRange(values);
        if(values !== null) {
            setInputValue({...inputValue, pgEduStartDate: values[0], pgEduEndDate: values[1]});
        }
    }

    const handleRegValDate = (values) => {
        setRegValDateRange(values);
        if(values !== null) {
            setInputValue({...inputValue, pgRegValStartDate: values[0], pgRegValEndDate: values[1]});
        }
    }

    const handleInterviewValDate = (values) => {
        setInterviewValDateRange(values);
        if(values !== null) {
            setInputValue({...inputValue, pgInterviewValStartDate: values[0], pgInterviewValEndDate: values[1]});
        }
    }

    const handleInterviewValTime = (values) => {
        setInterviewValTimeRange(values);
        if(values === null) {
            setInputValue({...inputValue, pgInterviewValStartTime: null, pgInterviewValEndTime: null});
            return;
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
                                            onChange={handleProgDate}
                                        />
                                        <label>교육 진행 기간</label>
                                        <ProgDateRangePicker
                                            value={eduDateRange}
                                            onChange={handleEduDate}
                                        />
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <h4>학생모집 기간</h4>
                                    <div>
                                        <label>신청 가능 기간</label>
                                        <ProgDateRangePicker
                                            value={regValDateRange}
                                            onChange={handleRegValDate}
                                        />
                                        <label>면접 가능 기간</label>
                                        <ProgDateRangePicker
                                            value={interviewValDateRange}
                                            onChange={handleInterviewValDate}
                                        />
                                        <label>면접 가능 시간</label>
                                        <TimeRange30Picker
                                            value={interviewValTimeRange}
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