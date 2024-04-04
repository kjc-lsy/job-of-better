import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import * as user from "../../apis/user";
import * as company from "../../apis/company";
import {useAuth} from "../../contexts/AuthContextProvider";

const CoverLetter = () => {
    const {isLogin} = useAuth();
    const [mclTitle, setMclTitle] = useState("");
    let [inputValue, setInputValue] = useState([{
        num: 1,
        id: 0,
        maxlength: 0,
        minlength: 0,
        question: "",
        answer: "",
        type: "",
        answerValid: false,
    }]);

    // 자소서 항목 들고오기
    useEffect(() => {
        //console.log("test");
        company.coverLetterInfo()
            .then(response => {
                setInputValue(
                    response.data.map((item, index) => {
                        return {
                            num: index + 1,
                            id: item.cclIdx,
                            comIdx: item.cclComIdx,
                            maxlength: item.cclMaxLength,
                            minlength: item.cclMinLength,
                            question: item.cclLetterQuestion,
                            answer: "",
                            answerValid: false,
                            type: item.mclIsConfirm ? item.mclIsConfirm : ""
                        }
                    }));
            })
            .catch(error => {
                console.error("error", error.response.data);
            });
    }, [isLogin]);

    const onChange = ({target, index}) => {
        let updatedInputValue = [...inputValue];
        updatedInputValue[index].answer = target.value;
        setInputValue(updatedInputValue);
    };

    useEffect(() => {
        const updatedInputValue = inputValue.map(item => ({
            ...item,
            answerValid: (item.maxlength !== 0 || item.maxlength !== null)
                ? (item.minlength !== 0 || item.minlength !== null)
                    ? item.answer.length >= item.minlength && item.answer.length <= item.maxlength
                    : item.answer.length <= item.maxlength
                : (item.minlength !== 0 || item.minlength !== null)
                    ? item.answer.length >= item.minlength
                    : true
        }));
        setInputValue(prevInputValue => {
            // Only update if there's a change in inputValue to prevent infinite loop
            if (JSON.stringify(prevInputValue) !== JSON.stringify(updatedInputValue)) {
                return updatedInputValue;
            }
            return prevInputValue;
        });
    }, [inputValue]);

    // 제목 변경 핸들러
    const handleMclTitleChange = (e) => {
        const inputValue = e.target.value; // 입력된 값
        if (inputValue.length <= 100) { // 최대 길이를 초과하지 않는지 확인
            setMclTitle(inputValue); // 상태를 업데이트합니다.
        }
    };

    const save = (e, type) => {
        e.preventDefault();
        if (inputValue[0].answer === "") {
            alert("항목을 하나 이상 입력해주세요：)");
        } else {
            setInputValue((s) => s.map((v) => ({
                ...v, type: type
            })));
            if (type === "Y") {
                if (window.confirm("제출하시면 기업 담당자에게 전달됩니다. \n제출하시겠습니까?")) {
                    axiosSave(inputValue);
                }
            } else {
                axiosSave(inputValue);
            }
        }
    };

    function axiosSave(inputValue) {
        user.userCoverLetterSave(inputValue)
            .then(response => {
                //navigate('/auth/login')
                if (response.data === "SUCCESS") {
                    if (response.data.type === "Y") {
                        alert("등록이 완료되었습니다.");
                    } else {
                        alert("임시저장되었습니다. \n작성 완료 후 제출버튼을 눌러주세요.")
                    }
                }
                //alert(response.data)
            })
            .catch(error => {
                console.error("error", error.response.data);
            });
    }

    return (
        <div className="content">
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">자기소개서</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form role="form" name="" aria-label="coverletter save">
                        <FormGroup className="coverLetterTitle">
                            <div className="coverletter_user">
                                <div>제목</div>
                                <div className="cl_length">
                                    <span>{mclTitle.length}</span>자
                                </div>
                            </div>
                            <Input
                                type="text"
                                value={mclTitle}
                                name="mclTitle"
                                id="mclTitle"
                                maxLength="50"
                                placeholder="제목을 입력해주세요. (100자이내)"
                                onChange={handleMclTitleChange}
                            />
                        </FormGroup>
                        {inputValue.map((value, index) => {
                            return (
                                <Row key={value.num}>
                                    <Col className="pr-md-1" md="12">
                                        <FormGroup>
                                            {/*<label>항목 {index + 1 > 10 ? index + 1 : "0" + (index + 1)}</label>*/}
                                            <div className="coverletter_user">
                                                <div>
                                                    <b>{index + 1}.</b> {value.question}
                                                </div>
                                                <div className="cl_length">
                                                    <span>{value.answer.length}</span>자
                                                </div>
                                            </div>
                                            <Input
                                                type="textarea"
                                                value={value.answer}
                                                placeholder={"자기소개서 항목" + (index + 1 > 10 ? index + 1 : "0" + (index + 1))}
                                                onChange={e => onChange({target: e.target, index: index})}
                                            />
                                            <div className="text-muted font-italic">
                                                <small>
                                                    {" "}
                                                    {value.answerValid && value.answer !== "" ? (
                                                        <span className="text-success font-weight-700">등록가능합니다.</span>
                                                    ) : (
                                                        value.maxlength <= 0 ? (
                                                            value.minlength <= 0 ? (
                                                                <span>글자 제한이 없습니다. 자유롭게 입력해주세요.</span>
                                                            ) : (
                                                                <span
                                                                    className={value.answer !== "" ? "text-danger font-weight-700" : ""}>{value.minlength}자 이상 작성해주세요.</span>
                                                            )
                                                        ) : (
                                                            value.minlength <= 0 ?
                                                                <span
                                                                    className={value.answer !== "" ? "text-danger font-weight-700" : ""}>{value.maxlength}자 이하로 작성해주세요.</span>
                                                                :
                                                                <span
                                                                    className={value.answer !== "" ? "text-danger font-weight-700" : ""}>{value.minlength}자 이상, {value.maxlength}자 이하로 작성해주세요.</span>
                                                        )
                                                    )}
                                                </small>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            )
                        })}
                        <div className="btngroup">
                            <Button className="greyBtn" onClick={(e) => save(e, "N")}>임시저장</Button>
                            <Button onClick={(e) => save(e, "Y")}>제출</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
};
export default CoverLetter;