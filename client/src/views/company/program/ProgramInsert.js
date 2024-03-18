import React, {useContext, useRef, useState} from 'react';
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {Editor} from "@toast-ui/react-editor";
import {saveProgram} from "../../../apis/program";
import {ThemeContext} from "../../../contexts/ThemeWrapper";
import {useNavigate} from "react-router-dom";

// date-range
import {DateRange} from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const ProgramInsert = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const editorRef = useRef();
    const {theme} = useContext(ThemeContext);
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const onChangeGetHTML = () => {
        const data = editorRef.current.getInstance().getHTML();
        setContent(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await saveProgram(title, content);
            alert(response.data)
            navigate('/company/program')
        } catch (e) {
            alert(e.response.data)
            console.log(e)
        }
    }
    return (
        <div className="content">
            <Card>
                <CardHeader>
                    <h5 className="card-category">교육생들에게 소개할 프로그램 내용을 등록해주세요</h5>
                    <CardTitle tag="h3">프로그램 등록</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form className="enrollProg" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <label>프로그램 제목</label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>프로그램 진행 일자</label>
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDateRange([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                        dateDisplayFormat="yyyy-MM-dd"
                                    />
                                </Col>
                                <Col>
                                    <label>면접 가능 일자</label>
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDateRange([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                        dateDisplayFormat="yyyy-MM-dd"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>프로그램 내용</label>
                                    <div className={theme === 'white-content' ? '' : 'toastui-editor-dark'}>
                                        <Editor
                                            height="400px"
                                            previewStyle="vertical"
                                            initialEditType="markdown"
                                            ref={editorRef}
                                            onChange={onChangeGetHTML}
                                        />
                                    </div>
                                    <Button type="submit"> 추가 </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProgramInsert;