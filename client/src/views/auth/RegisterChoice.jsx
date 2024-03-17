import React from "react";
import {Button, Card, CardBody, CardHeader, Col} from "reactstrap";
import {useNavigate} from "react-router-dom";
import companyImg from "../../assets/img/register_company.png";
import userImg from "../../assets/img/register_user.png";
const RegisterChoice = () => {
    return (
        <>
            <Col lg="8" md="8" className="register_choice_con">
                <Card>
                    <CardHeader className="text-center">
                        <h3 className="title">회원가입</h3>
                        <p>가입하실 회원유형을 선택해주세요.</p>
                    </CardHeader>
                    <CardBody>
                        <Button
                            className="btn2"
                            href="/auth/register"
                            block
                        >
                            <img src={userImg} alt="개인회원가입에 대한 이미지"/>
                            <h4>개인 회원</h4>
                            <p>14세 이상 <span>일반회원</span></p>
                        </Button>
                        <Button
                            className="btn2"
                            href="/auth/register-company"
                            block
                        >
                            <img src={companyImg} alt="기업회원가입에 대한 이미지"/>
                            <h4>기업 회원</h4>
                            <p>취업 컨설팅을 등록할 <span>기업회원</span><br/>(가입 전 <b>사업자등록증</b>을 준비해주세요.)</p>
                        </Button>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
}

export default RegisterChoice;