import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import * as user from "../../apis/user";
import * as company from "../../apis/company";
import {useAuth} from "../../contexts/AuthContextProvider";
import {userCoverLetterSave} from "../../apis/user";

const CoverLetter = () => {
    const {isLogin} = useAuth();

    let [inputValue, setInputValue] = useState([{
        num: 1,
        id: 0,
        maxlength: 0,
        minlength: 0,
        question: "",
        answer: "",
        answerValid: false
    }]);

    const save = (e) => {
        e.preventDefault();
        if (inputValue[0].answer === "") {
            alert("항목을 하나 이상 입력해주세요：)");
        } else {
            //inputValue.map(value => value.question)
            user.userCoverLetterSave(inputValue)
                .then(response => {
                    //navigate('/auth/login')
                    if (response.data === "SUCCESS") {
                        alert("등록이 완료되었습니다.");
                    }
                    //alert(response.data)
                })
                .catch(error => {
                    console.error("error", error.response.data);
                });
        }
    };

    // 자소서 항목 들고오기
    useEffect(() => {
        company.coverLetterInfo()
            .then(response => {
                setInputValue(
                    response.data.map((item, index) => {
                        return {
                            num: index + 1,
                            id: item.cclIdx,
                            maxlength: item.cclMaxLength,
                            minlength: item.cclMinLength,
                            question: item.cclLetterQuestion,
                            answer:"",
                            answerValid: false
                        }
                    }));
            })
            .catch(error => {
                console.error("error", error.response.data);
            });
    }, [isLogin]);

    useEffect(() => {
        setInputValue(prevInputValue => prevInputValue.map(item => ({
            ...item,
            answerValid: item.maxlength > 0 ?
                item.answer.length >= item.minlength && item.answer.length <= item.maxlength
               : item.minlength > 0? item.answer.length >= item.minlength : item.maxlength <= 0 && item.minlength <= 0 ? true : false
        })));
    }, [inputValue.answer]);

    return (
        <div className="content">
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">자기소개서</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form role="form" name="" aria-label="coverletter save">

                        {inputValue.map((value, index) => {
                            return (
                                <Row key={value.num}>
                                    <Col className="pr-md-1" md="12">
                                        <FormGroup>
                                            {/*<label>항목 {index + 1 > 10 ? index + 1 : "0" + (index + 1)}</label>*/}
                                            <div className="coverletter_user">
                                               <b>{index+1}.</b> {value.question}
                                            </div>
                                            <Input
                                                type="textarea"
                                                value={value.answer}
                                                placeholder={"자기소개서 항목" + (index + 1 > 10 ? index + 1 : "0" + (index + 1))}
                                                onChange={e => {
                                                    const updatedInputValue = [...inputValue];
                                                    updatedInputValue[index].answer = e.target.value;
                                                    setInputValue(updatedInputValue);
                                                }}
                                                //defaultValue="자기소개서 작성"
                                            />
                                            <div className="text-muted font-italic">
                                                <small>
                                                    {" "}
                                                    {value.answerValid && value.answer !== "" ? (
                                                        <span className="text-success font-weight-700">등록가능합니다.</span>
                                                    ) : (
                                                        value.maxlength <= 0 ? (
                                                            <span className={value.answer !== "" ? "text-danger font-weight-700" : ""}>{value.minlength}자 이상 작성해주세요.</span>
                                                        ) : value.minlength <= 0 ? (
                                                            "글자 제한이 없습니다. 자유롭게 입력해주세요."
                                                        ) : (
                                                            <span className={value.answer !== "" ? "text-danger font-weight-700" : ""}>{value.minlength}자 이상, {value.maxlength}자 이하로 작성해주세요.</span>
                                                        )
                                                    ) }
                                                </small>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            )
                        })}
                        <div className="btngroup">
                            <Button className="greyBtn">임시저장</Button>
                            <Button>제출</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
};
export default CoverLetter;