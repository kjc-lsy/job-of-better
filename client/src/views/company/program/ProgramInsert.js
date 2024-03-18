import React, {useContext, useRef, useState} from 'react';
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {Editor} from "@toast-ui/react-editor";
import {saveProgram} from "../../../apis/program";
import {ThemeContext} from "../../../contexts/ThemeWrapper";
import {useNavigate} from "react-router-dom";
import {FaClock} from 'react-icons/fa';

// date-range-rsuite
import 'rsuite/dist/rsuite.min.css';
import ProgDateRangePicker from "../../../components/ProgDateRangePicker";
import {DateRangePicker} from "rsuite";

const ProgramInsert = () => {
    const now = new Date();
    const [inputValue, setInputValue] = useState({
        progStartDate: now,
        progEndDate: now,
        eduStartDate: now,
        eduEndDate: now,
        regValStartDate: now,
        regValEndDate: now,
        interviewValStartDate: now,
        interviewValEndDate: now,
        interviewValStartTime: now,
        interviewValEndTime: now,
        title: '',
        content: '',
    });

    const editorRef = useRef();
    const {theme} = useContext(ThemeContext);
    const navigate = useNavigate();

    const onChangeGetHTML = () => {
        const data = editorRef.current.getInstance().getHTML();
        setInputValue({...inputValue, content: data});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await saveProgram(inputValue.title, inputValue.content);
            alert(response.data)
            navigate('/company/program')
        } catch (e) {
            alert(e.response.data)
            console.log(e)
        }
    }
    return (
        <div className="content">
            <Card className="enrollProg">
                <CardHeader>
                    <h5 className="card-category">교육생들에게 소개할 프로그램 내용을 등록해주세요</h5>
                    <CardTitle tag="h3">프로그램 등록</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Row>
                                <Col md='6' className='mb-4 mb-md-0'>
                                    <h4>프로그램 기간</h4>
                                    <div>
                                        <label>전체 프로그램 기간</label>
                                        <ProgDateRangePicker
                                        />
                                        <label>교육 진행 기간</label>
                                        <ProgDateRangePicker/>
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <h4>학생모집 기간</h4>
                                    <div>
                                        <label>신청 가능 기간</label>
                                        <ProgDateRangePicker/>
                                        <label>면접 가능 기간</label>
                                        <ProgDateRangePicker/>
                                        <label>면접가능 세부 시간</label>
                                        <DateRangePicker
                                            placeholder='면접 가능 시간'
                                            format="HH:mm"
                                            caretAs={FaClock}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                            <Col>
                                    <h4>프로그램 세부정보</h4>
                                    <div>
                                        <label>프로그램 제목</label>
                                        <Input
                                            value={inputValue.title}
                                            onChange={(e) => setInputValue({...inputValue, title: e.target.value})}
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