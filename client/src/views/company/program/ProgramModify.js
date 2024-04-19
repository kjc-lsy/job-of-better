import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {Editor} from "@toast-ui/react-editor";
import {ThemeContext} from "../../../contexts/ThemeWrapper";
import {getProgram, updateProgram} from "../../../apis/program";
import ProgDateRangePicker from "../../../components/Picker/ProgDateRangePicker";
import TimeRange30Picker from "../../../components/Picker/TimeRange30Picker";
import {InputNumber, InputPicker} from "rsuite";

const ProgramModify = () => {
    const {pgIdx} = useParams();
    const [content, setContent] = useState('');
    const editorRef = useRef();
    const theme = useContext(ThemeContext);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const [progDateRange, setProgDateRange] = useState([null, null]);
    const [eduDateRange, setEduDateRange] = useState([null, null]);
    const [regValDateRange, setRegValDateRange] = useState([null, null]);
    const [interviewValDateRange, setInterviewValDateRange] = useState([null, null]);
    const [interviewValTimeRange, setInterviewValTimeRange] = useState([null, null]);
    const [isLoading, setIsLoading] = useState(true);
    const [itvUnitTime, setItvUnitTime] = useState(30);
    const [itvMaxItvPerUnit, setItvMaxItvPerUnit] = useState(3);

    const itvUnitTimeLabel = [{label: '30분', value: 30}, {label: '60분', value: 60}, {label: '90분', value: 90}, {label: '120분', value: 120}];

    useEffect(() => {
        getProgram(pgIdx).then((response) => {
            const fetchedProgram = response.data;

            setTitle(fetchedProgram.pgTitle);
            setContent(fetchedProgram.pgContent);
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
                fetchedProgram.pgInterviewValStartTime ? new Date(new Date().toISOString().slice(0, 10) + ' ' + fetchedProgram.pgInterviewValStartTime) : null,
                fetchedProgram.pgInterviewValEndTime ? new Date(new Date().toISOString().slice(0, 10) + ' ' + fetchedProgram.pgInterviewValEndTime) : null
            ]);
            setIsLoading(false)
        });
    }, []);

    const addNineHours = (date) => {
        if (!date) return null;
        const newDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
        return newDate;
    };

    const formatTime = (date) => {
        if (!date) return null;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        // 시간과 분이 한 자리수일 경우 앞에 '0'을 붙여줍니다.
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 수정 내용을 content 변수에 담기
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
                pgInterviewValStartTime: formatTime(interviewValTimeRange[0]),
                pgInterviewValEndTime: formatTime(interviewValTimeRange[1]),
                pgTitle: title,
                pgContent: editorRef.current.getInstance().getMarkdown(),
                pgIdx: pgIdx
            });
            alert(response.data)
            navigate('/company/program-details/' + pgIdx)
        } catch (e) {
            alert(e.response.data)
            console.log(e)
        }
    }

    return (
        <div className="content program">
            <Card className="program-modify">
                <CardHeader>
                    <h5 className="card-category">프로그램을 수정합니다</h5>
                    <CardTitle tag="h3">프로그램 수정</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <div className="quote-subcategory">프로그램 제목</div>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md='6' className='mb-4 mb-md-0'>
                                    <div className="quote-subcategory">프로그램 기간</div>
                                    <div>
                                        <label>전체 프로그램 기간</label>
                                        <ProgDateRangePicker
                                            loading={isLoading}
                                            value={progDateRange}
                                            onChange={setProgDateRange}
                                        />
                                        <label>교육 진행 기간</label>
                                        <ProgDateRangePicker
                                            loading={isLoading}
                                            value={eduDateRange}
                                            onChange={setEduDateRange}
                                        />
                                        <label>신청 가능 기간</label>
                                        <ProgDateRangePicker
                                            loading={isLoading}
                                            value={regValDateRange}
                                            onChange={setRegValDateRange}
                                        />
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <div className="quote-subcategory">면접 설정</div>
                                    <div>
                                        <label>면접 가능 기간</label>
                                        <ProgDateRangePicker
                                            loading={isLoading}
                                            value={interviewValDateRange}
                                            onChange={setInterviewValDateRange}
                                        />
                                        <label>면접 가능 시간</label>
                                        <TimeRange30Picker
                                            loading={isLoading}
                                            value={interviewValTimeRange}
                                            onChange={setInterviewValTimeRange}
                                        />
                                        <label>면접 단위 시간</label>
                                        <InputPicker
                                            data={itvUnitTimeLabel}
                                            style={{width: "100px"}}
                                        />
                                        <label>면접 시간당 최대 인원수</label>
                                        <InputNumber
                                            style={{width: "100px"}}
                                            min={0}
                                            max={10}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <div className="quote-subcategory">프로그램 내용</div>
                            <div className={theme.theme === 'white-content' ? '' : 'toastui-editor-dark'}>
                                <Editor
                                    key={content}
                                    height="600px"
                                    previewStyle={window.innerWidth < 991 ? 'tab' : 'vertical'}
                                    initialEditType="markdown"
                                    ref={editorRef}
                                    initialValue={content}
                                />
                            </div>
                        </FormGroup>
                        <Button type="submit">수정완료</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProgramModify;