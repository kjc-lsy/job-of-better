import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {ThemeContext} from "../../../contexts/ThemeWrapper";
import {getProgram, updateProgram} from "../../../apis/program";
import ProgDateRangePicker from "../../../components/Picker/ProgDateRangePicker";
import TimeRangePicker from "../../../components/Picker/TimeRangePicker";
import {InputNumber, InputPicker} from "rsuite";
import {format} from "date-fns";
import ToastUiEditor from "../../../components/Editor/ToastUiEditor";

const ProgramModify = () => {
    const {pgIdx} = useParams();
    const editorRef = useRef();
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedProgram, setFetchedProgram] = useState({});

    const itvUnitTimeLabel = [{label: '30분', value: "30"}, {label: '60분', value: "60"}, {
        label: '90분',
        value: "90"
    }, {label: '120분', value: "120"}];

    useEffect(() => {
        getProgram(pgIdx).then((response) => {
            setFetchedProgram(response.data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedProgram = {...fetchedProgram, pgContent: editorRef?.current?.getInstance().getMarkdown()}

        try {
            const response = await updateProgram(updatedProgram);
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
                                value={fetchedProgram.pgTitle}
                                onChange={(e) => setFetchedProgram({...fetchedProgram, pgTitle: e.target.value})}
                                name={"pgTitle"}
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
                                            value={[new Date(fetchedProgram.pgProgStartDate), new Date(fetchedProgram.pgProgEndDate)]}
                                            onChange={(value) => setFetchedProgram({
                                                ...fetchedProgram,
                                                pgProgStartDate: value[0],
                                                pgProgEndDate: value[1]
                                            })}
                                        />
                                        <label>교육 진행 기간</label>
                                        <ProgDateRangePicker
                                            loading={isLoading}
                                            value={[new Date(fetchedProgram.pgEduStartDate), new Date(fetchedProgram.pgEduEndDate)]}
                                            onChange={(value) => setFetchedProgram({
                                                ...fetchedProgram,
                                                pgEduStartDate: value[0],
                                                pgEduEndDate: value[1]
                                            })}
                                        />
                                        <label>신청 가능 기간</label>
                                        <ProgDateRangePicker
                                            loading={isLoading}
                                            value={[new Date(fetchedProgram.pgRegValStartDate), new Date(fetchedProgram.pgRegValEndDate)]}
                                            onChange={(value) => setFetchedProgram({
                                                ...fetchedProgram,
                                                pgRegValStartDate: value[0],
                                                pgRegValEndDate: value[1]
                                            })}
                                        />
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <div className="quote-subcategory">면접 설정</div>
                                    <div>
                                        <label>면접 가능 기간</label>
                                        <ProgDateRangePicker
                                            loading={isLoading}
                                            value={[new Date(fetchedProgram.pgInterviewValStartDate), new Date(fetchedProgram.pgInterviewValEndDate)]}
                                            onChange={(value) => setFetchedProgram({
                                                ...fetchedProgram,
                                                pgInterviewValStartDate: value[0],
                                                pgInterviewValEndDate: value[1]
                                            })}
                                        />
                                        <label>면접 가능 시간</label>
                                        <TimeRangePicker
                                            loading={isLoading}
                                            value={[new Date(new Date().toISOString().slice(0, 10) + 'T' + fetchedProgram.pgInterviewValStartTime), new Date(new Date().toISOString().slice(0, 10) + 'T' + fetchedProgram.pgInterviewValEndTime)]}
                                            onChange={(value) => setFetchedProgram({
                                                ...fetchedProgram,
                                                pgInterviewValStartTime: format(value[0], 'HH:mm:ss'),
                                                pgInterviewValEndTime: format(value[1], 'HH:mm:ss')
                                            })}
                                        />
                                        <label>면접 단위 시간</label>
                                        <InputPicker
                                            loading={isLoading}
                                            data={itvUnitTimeLabel}
                                            style={{width: "100px"}}
                                            onChange={value => {
                                                setFetchedProgram({...fetchedProgram, pgInterviewUnitTime: value})
                                            }}
                                            value={fetchedProgram.pgInterviewUnitTime}
                                        />
                                        <label>면접 시간당 최대 인원수</label>
                                        <InputNumber
                                            style={{width: "100px"}}
                                            min={0}
                                            max={10}
                                            onChange={value => {
                                                setFetchedProgram({...fetchedProgram, pgMaxIntervieweesPerUnit: value})
                                            }}
                                            value={fetchedProgram.pgMaxIntervieweesPerUnit}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <div className="quote-subcategory">프로그램 내용</div>
                            <div className={theme.theme === 'white-content' ? '' : 'toastui-editor-dark'}>
                                <ToastUiEditor
                                    key={fetchedProgram.pgContent}
                                    ref={editorRef}
                                    initialValue={fetchedProgram.pgContent}
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