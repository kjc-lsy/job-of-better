import {Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import React, {useContext, useEffect, useState} from "react";
import {coverLetterInfo} from "../../apis/user";
import {LoadingContext} from "../../contexts/LoadingProvider";
import {useAlert} from "../../components/Alert/useAlert";

const CoverLetterDetails = ({idx}) => {
    const {loading, setLoading} = useContext(LoadingContext);
    const [mclTitle, setMclTitle] = useState("");
    const [inputLength, setInputLength] = useState("");
    const [IsDone, setIsDone] = useState(false);
    const sendAlert = useAlert();
    let [inputValue, setInputValue] = useState([{
        num: 1,
        id: 0,
        cclIdx: 0,
        maxlength: 0,
        minlength: 0,
        question: "",
        answer: "",
        type: "N",
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
            if (response.data.length > 0) {
                setInputLength("true");
                setInputValue(
                    response.data.map((item, index) => {
                        return {
                            num: index + 1,
                            id: item.memberCoverLetter?.mclIdx !== null && item.memberCoverLetter?.mclIdx !== undefined ? item.memberCoverLetter?.mclIdx : 0,
                            answer: item.memberCoverLetter?.mclAnswer,
                            type: item.memberCoverLetter?.mclIsConfirm ? item.memberCoverLetter?.mclIsConfirm : "N",

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

    return (
        <div className="content">
            <Card className="fullHei">
                <CardHeader>
                    <CardTitle tag="h4">자기소개서</CardTitle>
                </CardHeader>
                <CardBody>
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
                                        </FormGroup>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Form>
                </CardBody>
            </Card>

        </div>
    )
};
export default CoverLetterDetails;