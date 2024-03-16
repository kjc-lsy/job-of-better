import React, {useContext, useRef, useState} from 'react';
import {Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input} from "reactstrap";
import {Editor} from "@toast-ui/react-editor";
import {saveProgram} from "../../../apis/program";
import {ThemeContext} from "../../../contexts/ThemeWrapper";
import {useNavigate} from "react-router-dom";

const ProgramInsert = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const editorRef = useRef();
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();
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
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div className={theme.theme === 'white-content' ? '' : 'toastui-editor-dark'}>
                                <Editor
                                    height="400px"
                                    previewStyle="vertical"
                                    initialEditType="markdown"
                                    ref={editorRef}
                                    onChange={onChangeGetHTML}
                                />
                            </div>
                        </FormGroup>
                        <Button type="submit"> 추가 </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProgramInsert;