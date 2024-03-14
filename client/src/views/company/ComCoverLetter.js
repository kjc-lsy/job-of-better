import React, {useState} from "react";

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

function ComCoverLetter() {

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

    function deleteInput({num}) {
        //console.log(num);
        if (num !== 1) {
            setInputValue(inputValue.filter(input => (input.num !== num)));
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
                    alert(response.data)
                })
                .catch(error => {
                    alert(error.response.data);
                });
            console.log(inputValue);
            //coverLetterSave(inputValue);
        }
    }

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
                                            return (
                                                <li key={value.num}>
                                                    <Row>
                                                        <Col md="2">
                                                            <div>
                                                                <Label htmlFor={"minleng"+index}
                                                                >
                                                                    <span className="text-muted">최소 길이(ex. 100)</span>
                                                                </Label>
                                                                <Input
                                                                    id={"minleng"+index}
                                                                    onChange={(e) => {
                                                                        let copyInputValue = [...inputValue];
                                                                        copyInputValue[index].minlength = e.target.value;
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
                                                                    onChange={(e) => {
                                                                        let copyInputValue = [...inputValue];
                                                                        copyInputValue[index].maxlength = e.target.value;
                                                                        setInputValue(copyInputValue);
                                                                    }}
                                                                /> 자
                                                            </div>
                                                        </Col>
                                                        <Col md="8">
                                                            <FormGroup>
                                                                <label>항목 {index + 1}</label>
                                                                <Input
                                                                    placeholder={`항목 ${index + 1}`}
                                                                    type="text"
                                                                    onChange={(e) => {
                                                                        let copyInputValue = [...inputValue];
                                                                        copyInputValue[index].question = e.target.value;
                                                                        setInputValue(copyInputValue);
                                                                        //console.log(inputValue);
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="2">
                                                            <Button type="button"
                                                                    onClick={() => deleteInput({num})}>삭제</Button>
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
