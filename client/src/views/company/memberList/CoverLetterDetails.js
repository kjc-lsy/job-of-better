import {Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import React, {useContext, useEffect, useState} from "react";
import {getCoverLetterInfosByMemIdx} from "../../../apis/company";
import {useParams} from "react-router-dom";
import {useAlert} from "../../../components/Alert/useAlert";
import {LoadingContext} from "../../../contexts/LoadingProvider";

const CoverLetterDetails = () => {
    const {loading, setLoading} = useContext(LoadingContext);
    const [mclTitle, setMclTitle] = useState("");
    const [inputLength, setInputLength] = useState("");
    const [IsDone, setIsDone] = useState(false);
    const memIdx = useParams().idx;
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

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        setLoading(true);
        setIsDone(false);
        try {
            const response = await getCoverLetterInfosByMemIdx(memIdx);
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
            <Card className="cover-letter-wrapper cover-letter-details">
                <CardHeader>
                    <CardTitle tag="h4">자기소개서</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form role="form" name="" aria-label="coverletter save">
                        <FormGroup className="coverLetterTitle">
                            <div className="coverletter_user">
                                <div>제목</div>
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
                                            <div className="coverletter_user">
                                                <div className="cl_tit">
                                                    <b>{index + 1}.</b> {value.question}
                                                </div>
                                            </div>
                                            <div className="form-control">
                                                {value.answer}
                                            </div>
                                            <div className="cl_length">
                                                <span>{value.answer?.length ? value.answer?.length : 0}</span>자
                                            </div>
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