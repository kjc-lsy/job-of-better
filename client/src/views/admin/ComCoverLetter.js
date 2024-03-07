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
    Button, CardTitle,
} from "reactstrap";
import api from "js-cookie";
import {coverLetterSave} from "../../apis/admin";

function ComCoverLetter() {

    let [inputValue, setInputValue] = useState([{
        num: 1,
        question: ""
    }]);

    function addInput() {
        setInputValue(prevInputValue => [
            ...prevInputValue,
            {
                num: prevInputValue.length > 0 ? prevInputValue[prevInputValue.length - 1].num + 1 : 1,
                question: ""
            }
        ]);
        console.log(inputValue);
    }

    function deleteInput({num}) {
        //console.log(num);
        if( num !== 1) {
        setInputValue(inputValue.filter(input => (input.num !== num )));
            }
        //setInputValue()
    }

   const save = () => {
        coverLetterSave(inputValue);
        console.log(inputValue);
   }

    return (
        <>
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
                                                console.log(value);
                                                return (
                                                    <li key={value.num}>
                                                        {deleteInput}
                                                        <Row>
                                                            <Col md="10">
                                                        <FormGroup>
                                                            <label>항목 {index+1}</label>
                                                            <Input
                                                                placeholder={`항목 ${index+1}`}
                                                                type="text"
                                                                value={value.question}
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
                                                            <Button type="button" onClick={()=>deleteInput({num})}>삭제</Button>
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
        </>
    );
}

function save() {

}

export default ComCoverLetter;
