import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import React, {Suspense, useEffect, useState, useContext} from "react";
import * as user from "../../apis/user";
import * as company from "../../apis/company";
import {useAuth} from "../../contexts/AuthContextProvider";
import {LoadingContext} from "../../contexts/LoadingProvider";
import {coverLetterInfo} from "../../apis/user";
import {Message} from 'rsuite';

const CoverLetter = () => {
    const {loading, setLoading} = useContext(LoadingContext);
    const {isLogin} = useAuth();
    const [mclTitle, setMclTitle] = useState("");
    const [inputLength, setInputLength] = useState("");
    const [IsDone, setIsDone] = useState(false);
    let [inputValue, setInputValue] = useState([{
        num: 1,
        id: 0,
        cclIdx: 0,
        maxlength: 0,
        minlength: 0,
        question: "",
        answer: "",
        type: "",
        answerValid: false,
    }]);

    // 자소서 항목 들고오기
    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        setLoading(true);
        setIsDone(false);
        try {
            const response = await coverLetterInfo();
            setMclTitle(response.data[0].memberCoverLetter?.mclTitle)
            console.log(response.data);
            if (response.data.length > 0) {
                setInputLength("true");
                setInputValue(
                    response.data.map((item, index) => {
                        return {
                            num: index + 1,
                            id: item.memberCoverLetter?.mclIdx !== null && item.memberCoverLetter?.mclIdx !== undefined ? item.memberCoverLetter?.mclIdx : 0,
                            answer: item.memberCoverLetter?.mclAnswer,
                            type: item.memberCoverLetter?.mclIsConfirm ? item.memberCoverLetter?.mclIsConfirm : "",

                            cclIdx: item.comCoverLetter?.cclIdx ? item.comCoverLetter?.cclIdx : 0,
                            maxlength: item.comCoverLetter?.cclMaxLength,
                            minlength: item.comCoverLetter?.cclMinLength,
                            question: item.comCoverLetter?.cclLetterQuestion,
                        }
                    })
                );
            } else {
                setInputLength("false");
            }
        } catch (error) {
            console.error("error", error.response);
        } finally {
            setLoading(false);
            setIsDone(true);
        }
    }


    const onChange = ({target, index}) => {
        let updatedInputValue = [...inputValue];
        updatedInputValue[index].answer = target.value;
        setInputValue(updatedInputValue);
    };

    useEffect(() => {
        getLength();
    }, [inputValue]);

    const getLength = async () => {
        /*let answer_valid = false;

        if ((item.maxlength !== 0 || item.maxlength !== null)) {
            if ((item.minlength !== 0 || item.minlength !== null)) {
                answer_valid = item.answer?.length >= item.minlength && item.answer?.length <= item.maxlength;
            } else {
                answer_valid = item.answer?.length <= item.maxlength;
            }
        } else {
            if ((item.minlength !== 0 || item.minlength !== null)) {
                answer_valid = item.answer?.length >= item.minlength;
            } else {
                answer_valid = true;
            }
        }*/
        const updatedInputValue = inputValue.map(item => ({
            ...item,
            answerValid: (item.maxlength !== 0 || item.maxlength !== null)
                ? (item.minlength !== 0 || item.minlength !== null)
                    ? item.answer?.length >= item.minlength && item.answer?.length <= item.maxlength
                    : item.answer?.length <= item.maxlength
                : (item.minlength !== 0 || item.minlength !== null)
                    ? item.answer?.length >= item.minlength
                    : true
        }));
        setInputValue(prevInputValue => {
            // Only update if there's a change in inputValue to prevent infinite loop
            if (JSON.stringify(prevInputValue) !== JSON.stringify(updatedInputValue)) {
                return updatedInputValue;
            }
            return prevInputValue;
        });
    }

    // 제목 변경 핸들러
    const handleMclTitleChange = (e) => {
        const inputValue = e.target.value; // 입력된 값
        if (inputValue?.length <= 100) { // 최대 길이를 초과하지 않는지 확인
            setMclTitle(inputValue); // 상태를 업데이트합니다.
        }
    };

    const save = (e, type) => {
        e.preventDefault();
        //console.log(mclTitle);
        if (mclTitle === "" || mclTitle === null || mclTitle === undefined) {
            alert("제목을 입력해 주세요.")
        } else if (inputValue[0].answer === "" || inputValue[0].answer === null || inputValue[0].answer === undefined) {
            alert("항목을 하나 이상 입력해주세요：)");
        } else {
            setInputValue((prevState) => prevState.map((v) => ({
                ...v,
                type: type
            })));
            const updatedInputValue = inputValue.map(value => {
                return {
                    ...value,
                    type: type
                }
            });
            if (type === "Y") {
                if (window.confirm("제출하시면 기업 담당자에게 전달됩니다. \n제출하시겠습니까?")) {
                    axiosSave(updatedInputValue);
                }
            } else {
                axiosSave(updatedInputValue);
            }
        }
    };

    async function axiosSave(inputValue) {
        try {
            const response = await user.userCoverLetterSave(inputValue, mclTitle);
            //navigate('/auth/login')
            if (response.data.SUCCESS === "SUCCESS") {
                if (response.data.type === "Y") {
                    alert("등록이 완료되었습니다.");
                } else {
                    alert("임시저장되었습니다. \n작성 완료 후 제출버튼을 눌러주세요.")
                }
                getInfo();
            }

            //alert(response.data)
        } catch (error) {
            console.error("error", error.response.data);
        }
    }

    const inputValidate = (value) => {
        let text = "";
        let textColor = "";

        if (value.answer === "") {
            textColor = "text-danger font-weight-700";
            text = <span className={textColor}>내용을 입력해주세요.</span>;
        } else if (value.answerValid) {
            textColor = "text-success font-weight-700";
            text = <span className={textColor}>등록 가능합니다.</span>;
        } else {
            textColor = "";
            if (value.maxlength <= 0) {
                if (value.minlength <= 0) {
                    text = <span className={textColor}>글자 제한이 없습니다. 자유롭게 입력해주세요.</span>;
                } else {
                    text = <span className={textColor}>{value.minlength}자 이상 작성해주세요.</span>;
                }
            } else {
                if (value.minlength <= 0) {
                    text = <span className={textColor}>{value.maxlength}자 이하로 작성해주세요.</span>;
                } else {
                    text = <span className={textColor}>{value.minlength}자 이상, {value.maxlength}자 이하로 작성해주세요.</span>;
                }
            }
        }

        return text;
    }


    return (
        <div className="content">
            {loading ? null :
                <Card className="fullHei">
                    <CardHeader>
                        <CardTitle tag="h4">자기소개서</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {inputValue[0].type === "Y" ?
                            <Message showIcon type="success">
                                <strong>제출 완료!</strong> 제출이 완료 되었습니다. 추가 적인 수정을 원하면 작성 후 다시 제출 버튼을 눌러주세요.
                            </Message>
                        : inputValue[0].type === "N" ?
                        <Message showIcon type="info">
                            <strong>임시 저장!</strong> 임시 저장 되었습니디. 제출을 하셔야 프로그램 담당자 확인이 가능합니다.
                        </Message>
                        : null}
                        {inputLength === "true" ?
                            <Form role="form" name="" aria-label="coverletter save">
                                <FormGroup className="coverLetterTitle">
                                    <div className="coverletter_user">
                                        <div>제목</div>
                                        <div className="cl_length">
                                            <span>{mclTitle?.length ? mclTitle?.length : 0}</span>자
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
                                                        <div className="cl_tit">
                                                            <b>{index + 1}.</b> {value.question}
                                                        </div>
                                                        <div className="cl_length">
                                                            <span>{value.answer?.length ? value.answer?.length : 0}</span>자
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
                                                            {inputValidate(value)}
                                                            {/*{" "}
                                                        {value.answerValid && value.answer !== "" ? (
                                                            <span
                                                                className="text-success font-weight-700">등록가능합니다.</span>
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
                                                        )}*/}
                                                        </small>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    )
                                })}
                                <div className="btngroup">
                                    <Button className="greyBtn" disabled={!IsDone}
                                            onClick={(e) => save(e, "N")}>임시저장</Button>
                                    <Button disabled={!IsDone} onClick={(e) => save(e, "Y")}>제출</Button>
                                </div>
                            </Form>
                            : <div className="noCoverLetter">등록된 자기 소개서 항목이 없습니다.</div>}
                    </CardBody>
                </Card>}

        </div>
    )
};
export default CoverLetter;