import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";
import BirthDateFormGroup from "../FormGroup/BirthDateFormGroup";
import PhoneFormGroup from "../FormGroup/PhoneFormGroup";
import EmailFormGroup from "../FormGroup/EmailFormGroup";
import RegisterAddrFormGroup from "../FormGroup/RegisterAddrFormGroup";
import React from "react";
import {useAlert} from "../Alert/useAlert";
import {update} from "../../apis/auth";

export default function ModifiedCard({modifiedValue, setModifiedValue}) {
    const sendAlert = useAlert();
    async function save() {
        try {
            await update(modifiedValue);
            sendAlert("success", "수정이 완료되었습니다.");
        }
        catch(error) {
            sendAlert("error","작업을 실패하였습니다.");
            console.error(error.response.data);
        }
    }

    return (
        <Card className="modify_form">
            <CardHeader>
                <h5 className="title">내 정보 수정</h5>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row className={"mb-2"}>
                        <Col className="pr-md-1" md="6">
                            <FormGroup>
                                <label>아이디</label>
                                <Input
                                    defaultValue=""
                                    placeholder="username"
                                    type="text"
                                    value={modifiedValue.username}
                                    disabled={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                            <FormGroup>
                                <label>이름</label>
                                <Input
                                    defaultValue=""
                                    placeholder="name"
                                    type="text"
                                    value={modifiedValue.name}
                                    disabled={true}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className={"mb-2"}>
                        <Col className="pr-md-1" md="6">
                            <BirthDateFormGroup inputValue={modifiedValue} setInputValue={setModifiedValue}/>
                        </Col>
                        <Col className="pl-md-1" md="6">
                            <PhoneFormGroup inputValue={modifiedValue} setInputValue={setModifiedValue}/>
                        </Col>
                    </Row>
                    <Row className={"mb-2"}>
                        <Col className={"pr-md-1"} md="12">
                            <EmailFormGroup inputValue={modifiedValue} setInputValue={setModifiedValue}/>
                        </Col>
                    </Row>
                    <RegisterAddrFormGroup
                        label="개인 주소"
                        placeholder="상세주소"
                        inputValue={modifiedValue}
                        setInputValue={setModifiedValue}
                    />

                </Form>
            </CardBody>
            <CardFooter>
                <Button className="btn-fill" color="primary" type="submit" onClick={save}>
                    저장
                </Button>
            </CardFooter>
        </Card>
    )
}