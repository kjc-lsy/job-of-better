import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup} from "reactstrap";
import {Editor} from "@toast-ui/react-editor";
import {ThemeContext} from "../../../contexts/ThemeWrapper";
import {getProgram, updateProgram} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";

const ProgramModifyContent = () => {
    const {pgIdx} = useParams();
    const [program, setProgram] = useState({});
    const [content, setContent] = useState('');
    const editorRef = useRef();
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();
    const {isLogin} = useAuth();

    useEffect(() => {
        if (isLogin) {
            getProgram(pgIdx).then((response) => {
                const fetchedProgram = response.data;
                setProgram(fetchedProgram);

                editorRef.current.getInstance().setHTML(fetchedProgram.pgContent); // 프로그램 내용 설정
                setContent(fetchedProgram.pgContent)
            });
        }
    }, [isLogin]);

    const onChangeGetHTML = () => {
        const data = editorRef.current.getInstance().getHTML();
        setContent(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProgram({pgIdx : program.pgIdx, pgContent: content});
            alert(response.data)
            navigate('/company/program-info/' + program.pgIdx)
        } catch (e) {
            alert(e.response.data)
            console.log(e)
        }
    }

    return (
        <div className="content">
            <Card className="program-modify">
                <CardHeader>
                    <CardTitle tag="h3">프로그램 내용 수정</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <div className={theme.theme === 'white-content' ? '' : 'toastui-editor-dark'}>
                                <Editor
                                    height="600px"
                                    previewStyle={window.innerWidth < 991 ? 'tab' : 'vertical'}
                                    initialEditType="markdown"
                                    ref={editorRef}
                                    onChange={onChangeGetHTML}
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

export default ProgramModifyContent;