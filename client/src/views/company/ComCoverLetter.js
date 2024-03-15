import React, {useEffect, useState} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    FormGroup,
    Input,
    Form,
    Button, CardTitle, Label,
} from "reactstrap";
//import {coverLetterSave} from "../../apis/company";
import * as company from "../../apis/company";
import {useAuth} from "../../contexts/AuthContextProvider";

function ComCoverLetter() {
    const {isLogin} = useAuth();

    let [inputValue, setInputValue] = useState([{
        num: 1,
        id: null,
        maxlength:0,
        minlength:0,
        question: ""
    }]);

    function addInput() {
        setInputValue(prevInputValue => [
            ...prevInputValue,
            {
                num: prevInputValue.length > 0 ? prevInputValue[prevInputValue.length - 1].num + 1 : 1,
                id: null,
                maxlength:0,
                minlength:0,
                question: ""
            }
        ]);
    }

    function deleteInput({num,id}) {
        //console.log(id);
        if(id === null) {
            if(inputValue.length > 1) {
                setInputValue(inputValue.filter(input => (input.num !== num)));
            }else {
                alert("항목은 한개 이상이어야 합니다.");
            }
        }else {
            company.coverLetterDelete(id)
                .then(response => {
                    //console.log(response.data);
                    if(response.data === "SUCCESS") {
                        setInputValue(inputValue.filter(input => (input.num !== num)));
                    }
                })
                .catch(error => {
                    console.error("error",error.response.data);
                });
        }
        //setInputValue()
    }

    const save = (e) => {
        e.preventDefault();
        if (inputValue[0].question === "") {
            alert("항목을 하나 이상 입력해주세요.");
        }else if(inputValue.some(value => !value.question)) {
            alert("빈 값은 등록 할 수 없습니다.\n 삭제 또는 내용을 입력해주세요.")
        } else {
            //inputValue.map(value => value.question)
            company.coverLetterSave(inputValue)
                .then(response => {
                    //navigate('/auth/login')
                    if(response.data === "SUCCESS") {
                        alert("등록이 완료되었습니다.")
                    }
                    //alert(response.data)
                })
                .catch(error => {
                    console.error("error",error.response.data);
                });
        }
    }
    useEffect(() => {
        company.coverLetterInfo()
            .then(response => {
                setInputValue(
                    response.data.map((item,index) => {
                        return {
                            num: index+1,
                            id: item.cclIdx,
                            maxlength: item.cclMaxLength,
                            minlength: item.cclMinLength,
                            question: item.cclLetterQuestion
                        }
                    }));
                //console.log(response.data);
            })
            .catch(error => {
                console.error("error",error.response.data);
            });
    }, [isLogin]);


    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">자소서 항목</CardTitle>
                        </CardHeader>
                        <CardBody>
                        <Form role="form" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <ul>
                                        {inputValue.map((value, index) => {
                                            let num = value.num;
                                            let id = value.id;
                                            return (
                                                <li key={value.num}>
                                                    <Row>
                                                        <Col md="2">
                                                            <div>
                                                                <Label htmlFor={"minleng"+index}>
                                                                    <span className="text-muted">최소 길이(ex. 100)</span>
                                                                </Label>
                                                                <Input
                                                                    id={"minleng"+index}
                                                                    value={value.minlength}
                                                                    onChange={(e) => {
                                                                        let sanitizedValue = e.target.value.replace(/[^0-9.]/g, '');
                                                                        e.target.value = sanitizedValue;
                                                                        let copyInputValue = [...inputValue];
                                                                        copyInputValue[index].minlength = sanitizedValue;
                                                                        setInputValue(copyInputValue);
                                                                    }}
                                                                /> 자
                                                            </div>
                                                            <div>
                                                                <Label htmlFor={"maxleng"+index}
                                                                >
                                                                    <span className="text-muted">최대 길이(ex. 200~300 or 500)</span>
                                                                </Label>
                                                                <Input
                                                                    id={"maxleng"+index}
                                                                    value={value.maxlength}
                                                                    onChange={(e) => {
                                                                        let sanitizedValue = e.target.value.replace(/[^0-9.]/g, '');
                                                                        e.target.value = sanitizedValue;
                                                                        let copyInputValue = [...inputValue];
                                                                        copyInputValue[index].maxlength = sanitizedValue;
                                                                        setInputValue(copyInputValue);
                                                                    }}
                                                                /> 자
                                                            </div>
                                                        </Col>
                                                        <Col md="8">
                                                            <FormGroup>
                                                                <label>항목 {index + 1}</label>
                                                                <Input
                                                                    type="textarea"
                                                                    placeholder={`[항목 ${index + 1}]에 들어갈 내용을 입력해주세요.`}
                                                                    value={value.question}
                                                                    onChange={(e) => {
                                                                        let copyInputValue = [...inputValue];
                                                                        copyInputValue[index].question = e.target.value;
                                                                        setInputValue(copyInputValue);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="2">
                                                            <Button type="button"
                                                                    onClick={() => deleteInput({num,id})}>삭제</Button>
                                                        </Col>
                                                    </Row>
                                                </li>)
                                        })}
                                    </ul>
                                </div>

                                <Button type="button" onClick={addInput}>추가</Button>
                                <Button type="button" onClick={save}>저장</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ComCoverLetter;
