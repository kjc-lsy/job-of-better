import React, {useContext, useRef, useState} from 'react';
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {Editor} from "@toast-ui/react-editor";
import {saveProgram} from "../../../apis/program";
import {ThemeContext} from "../../../contexts/ThemeWrapper";
import {useNavigate} from "react-router-dom";

// date-range-rsuite
import 'rsuite/dist/rsuite.min.css';
import ProgDateRangePicker from "../../../components/Picker/ProgDateRangePicker";
import TimeRangePicker from "../../../components/Picker/TimeRangePicker";
import {format} from "date-fns";

const ProgramInsert = () => {
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
    const editorRef = useRef();
    const {theme} = useContext(ThemeContext);
    const navigate = useNavigate();

    const onChangeGetHTML = () => {
        const data = editorRef.current.getInstance().getHTML();
        setInputValue({...inputValue, pgContent: data});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = {
            pgProgStartDate: '전체 프로그램 기간',
            pgEduStartDate: '교육 진행 기간',
            pgRegValStartDate: '신청 가능 기간',
            pgTitle: '프로그램 제목',
            pgContent: '프로그램 내용',
        };

        let missingFields = [];

        for (const [key, label] of Object.entries(requiredFields)) {
            if (!inputValue[key] || (typeof inputValue[key] === 'string' && inputValue[key].trim() === '')) {
                missingFields.push(label);
            }
        }

        if (missingFields.length > 0) {
            alert(`다음 정보를 입력해야 합니다: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await saveProgram(inputValue);
            alert(response.data);
            navigate('/company/program');
        } catch (e) {
            alert(e.response.data);
            console.log(e);
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
        setInputValue({...inputValue, pgInterviewValStartTime: format(startTime, 'HH:mm'), pgInterviewValEndTime: format(endTime, 'HH:mm')});
        console.log(format(startTime, 'HH:mm'))
    }

    return (
        <div className="content program">
            <Card className="program-enroll">
                <CardHeader>
                    <h5 className="card-category">교육생들에게 소개할 프로그램 내용을 등록해주세요</h5>
                    <CardTitle tag="h3">프로그램 등록</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Row>
                                <Col md='6' className='mb-4 mb-md-0'>
                                    <div className="quote-subcategory">프로그램 기간</div>
                                    <div>
                                        <label>전체 프로그램 기간</label>
                                        <ProgDateRangePicker
                                            onChange={handleProgDate}
                                        />
                                        <label>교육 진행 기간</label>
                                        <ProgDateRangePicker
                                            onChange={handleEduDate}
                                        />
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <div className="quote-subcategory">학생모집 기간</div>
                                    <div>
                                        <label>신청 가능 기간</label>
                                        <ProgDateRangePicker
                                            onChange={handleRegValDate}
                                        />
                                        <label>면접 가능 기간</label>
                                        <ProgDateRangePicker
                                        onChange={handleInterviewValDate}
                                        />
                                        <label>면접 가능 시간</label>
                                        <TimeRangePicker
                                            onChange={handleInterviewValTime}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="quote-subcategory">프로그램 세부정보</div>
                                    <div>
                                        <label>프로그램 제목</label>
                                        <Input
                                            value={inputValue.PgTitle}
                                            onChange={(e) => setInputValue({...inputValue, pgTitle: e.target.value})}
                                        />
                                        <label>프로그램 내용</label>
                                        <div className={theme === 'white-content' ? '' : 'toastui-editor-dark'}>
                                            <Editor
                                                previewStyle={window.innerWidth < 991 ? 'tab' : 'vertical'}
                                                height="600px"
                                                initialEditType="markdown"
                                                ref={editorRef}
                                                onChange={onChangeGetHTML}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type="submit"> 추가 </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
        ;
};

export default ProgramInsert;