import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row} from "reactstrap";
import ComNameFormGroup from "../FormGroup/ComNameFormGroup";
import BTelFormGroup from "../FormGroup/BTelFormGroup";
import BNoFormGroup from "../FormGroup/BNoFormGroup";
import RegisterAddrFormGroup from "../FormGroup/RegisterAddrFormGroup";
import CeoNameFormGroup from "../FormGroup/CeoNameFormGroup";
import {getComInfo, updateComInfo} from "../../apis/company";
import {useAlert} from "../Alert/useAlert";

const ModifyComCard = () => {
    const [inputValue, setInputValue] = useState({});
    const sendAlert = useAlert();

    useEffect(() => {
        getComInfo().then(({data})=> {
            setInputValue((prev) => ({
                b_name: data.comName,
                b_tel: data.comPhone,
                b_no: data.comLicenseNum,
                b_ceoName: data.comCeoName,
                address: data.comAddress,
                detailAddr: data.comDetailAddr,
                zipCode: data.comZipcode,
                ...data,
                ...prev
            }))
        })
    }, []);

    const save = () => {
        updateComInfo({
            comName: inputValue.b_name,
            comPhone: inputValue.b_tel,
            comLicenseNum: inputValue.b_no,
            comCeoName: inputValue.b_ceoName,
            comAddress: inputValue.address,
            comDetailAddr: inputValue.detailAddr,
            comZipcode: inputValue.zipCode
        }).then(()=>{
            sendAlert("success", "회사 정보를 수정했습니다.");
        }).catch((e) => {
            sendAlert("error", "정보 수정에 실패했습니다.");
        })
    }

    return (
        <Card className="modify_form">
            <CardHeader>
                <h5 className="title">회사 정보 수정</h5>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row className={"mb-2"}>
                        <Col className="pr-md-1" md="6">
                            <ComNameFormGroup
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                            />
                        </Col>
                        <Col className="pr-md-1" md="6">
                            <CeoNameFormGroup
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                            />
                        </Col>
                    </Row>
                    <Row className={"mb-2"}>
                        <Col className="pr-md-1" md="6">
                            <BTelFormGroup
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                            />
                        </Col>
                        <Col className="pl-md-1" md="6">
                            <BNoFormGroup
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                disabled={true}
                            />
                        </Col>
                    </Row>
                    <Row className={"mb-2"}>
                        <Col className={"pr-md-1"} md="12">
                            <RegisterAddrFormGroup
                                label="회사 주소"
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                            />
                        </Col>
                    </Row>
                </Form>
            </CardBody>
            <CardFooter>
                <Button className="btn-fill" color="primary" type="submit" onClick={save}>
                    저장
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ModifyComCard;