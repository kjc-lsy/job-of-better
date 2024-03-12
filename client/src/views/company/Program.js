import React, {useContext, useEffect, useRef} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor, Viewer} from '@toast-ui/react-editor';
import {ThemeContext} from "../../contexts/ThemeWrapper";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col, FormGroup, Input, Form, CardSubtitle,
} from "reactstrap";


function Program() {
    const editorRef = useRef();
    let theme = useContext(ThemeContext);

    const onChangeGetHTML = () => {
        const data = editorRef.current.getInstance().getHTML();
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
                        <Form className="enrollProg">
                            <FormGroup>
                                <Input></Input>
                                <Editor
                                    height="400px"
                                    previewStyle="vertical"
                                    initialEditType="markdown"
                                    ref={editorRef}
                                    onChange={onChangeGetHTML}
                                />
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">등록된 프로그램</CardTitle>
                        <CardSubtitle>프로그램 목록 조회, 삭제, 수정 기능 넣자잉, 페이징도</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                        <Viewer initialValue={"<h2>으아아아아아</h2><br><p>놀라운 교육 시작합니다</p>"}/>
                    </CardBody>
                </Card>
            </Row>
        </div>
    );
}

export default Program;
