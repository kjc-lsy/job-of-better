import React, {useContext, useEffect, useRef, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import {Editor} from '@toast-ui/react-editor';
import {ThemeContext} from "../../contexts/ThemeWrapper";

// reactstrap components
import {Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Row, Table,} from "reactstrap";
import {getPrograms, programSave} from "../../apis/program";
import {useAuth} from "../../contexts/AuthContextProvider";


function Program() {
    const editorRef = useRef();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const theme = useContext(ThemeContext);
    const {isLogin} = useAuth();
    const [programs, setPrograms] = useState([]);

    // 로그인 처리가 완료 되면 그 이후에 함수를 실행
    useEffect(() => {
        if(isLogin) {
            loadPrograms();
        }
    }, [isLogin]);

    const loadPrograms= async () => {
        const response = await getPrograms();
        console.log(response.data);
    }

    const onChangeGetHTML = () => {
        const data = editorRef.current.getInstance().getHTML();
        setContent(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await programSave(title, content);
            alert(response.data)
        } catch(e) {
            alert(e.response.data)
            console.log(e)
        }
    }

    return (
        <div className="content">
            <Row>
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
                                    onChange={(e)=>setTitle(e.target.value)}
                                />
                                <div className={theme.theme==='white-content'?'':'toastui-editor-dark'}>
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

                <Card>
                    <CardHeader>
                        <h5 className="card-category">프로그램들은 이곳에서 수정, 삭제, 조회가 가능합니다</h5>
                        <CardTitle tag="h3">프로그램 목록</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th className="text-center">등록일</th>
                                <th className="text-center">수정일</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Dakota Rice</td>
                                <td>Niger</td>
                                <td>Oud-Turnhout</td>
                                <td className="text-center">$36,738</td>
                            </tr>
                            <tr>
                                <td>Minerva Hooper</td>
                                <td>Curaçao</td>
                                <td>Sinaai-Waas</td>
                                <td className="text-center">$23,789</td>
                            </tr>
                            <tr>
                                <td>Sage Rodriguez</td>
                                <td>Netherlands</td>
                                <td>Baileux</td>
                                <td className="text-center">$56,142</td>
                            </tr>
                            <tr>
                                <td>Philip Chaney</td>
                                <td>Korea, South</td>
                                <td>Overland Park</td>
                                <td className="text-center">$38,735</td>
                            </tr>
                            <tr>
                                <td>Doris Greene</td>
                                <td>Malawi</td>
                                <td>Feldkirchen in Kärnten</td>
                                <td className="text-center">$63,542</td>
                            </tr>
                            <tr>
                                <td>Mason Porter</td>
                                <td>Chile</td>
                                <td>Gloucester</td>
                                <td className="text-center">$78,615</td>
                            </tr>
                            <tr>
                                <td>Jon Porter</td>
                                <td>Portugal</td>
                                <td>Gloucester</td>
                                <td className="text-center">$98,615</td>
                            </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Row>
        </div>
    );
}

export default Program;
