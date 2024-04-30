import React, {useState} from "react";

// reactstrap components
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Row,} from "reactstrap";
import {useLoading} from "../../contexts/LoadingProvider";
import MyHomeUserInfo from "../../components/Infos/MyHomeUserInfo";
import EmailFormGroup from "../../components/FormGroup/EmailFormGroup";
import BirthDateFormGroup from "../../components/FormGroup/BirthDateFormGroup";
import PhoneFormGroup from "../../components/FormGroup/PhoneFormGroup";
import RegisterAddrFormGroup from "../../components/FormGroup/RegisterAddrFormGroup";

function UserProfile() {
    const {loading, setLoading} = useLoading(false);
    const [infoLoading, setInfoLoading] = useState(false);

    const [inputValue, setInputValue] = React.useState({
        name: "",
        username : "",
        address : "",
        detailAddr : "",
        zipCode: "",

        email: "",
        validEmail: false,
        emailUserName: "",
        domain: "",
        
        birthDate: "",

        phone: "",
        validPhone: false,

        profileImg: "", //require("assets/img/emilyz.jpg")
        gender: "",
    });
    const [modifiedValue, setModifiedValue] = React.useState({
        birthDate: "",
        phone : "",
        email: "",
        validEmail: false,
        emailUserName: "",
        domain: "",
        zipCode: "",
        address : "",
    })
    /*const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true); // 도메인 입력란의 readOnly 상태 관리를 위한 새로운 상태 변수

    const handleDomainChange = (domain) => {
        if (domain === '직접 입력') {
            setIsReadOnly(false);
            setInputValue({...inputValue, domain: ''});
        } else {
            setIsReadOnly(true);
            setInputValue({...inputValue, domain: domain});
        }
    };*/

    return (
        <div className="content user-profile-wrapper">
            {loading ? "" :
            <Row>
                <Col md="4">
                    <MyHomeUserInfo setInfoLoading={setInfoLoading} setLoading={setLoading} inputValue={inputValue} setInputValue={setInputValue} />
                </Col>
                <Col md="8">
                    {infoLoading &&
                      <Card className="modify_form">
                        <CardHeader>
                            <h5 className="title">내 정보 수정</h5>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <label>아이디</label>
                                            <Input
                                                defaultValue=""
                                                placeholder="username"
                                                type="text"
                                                value={inputValue.username}
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-md-1" md="6">
                                        <FormGroup>
                                            <label>이름</label>
                                            <Input
                                                defaultValue=""
                                                placeholder="name"
                                                type="text"
                                                value={inputValue.name}
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <BirthDateFormGroup inputValue={inputValue} setInputValue={setInputValue}/>
                                    </Col>
                                    <Col className="pl-md-1" md="6">
                                        <PhoneFormGroup inputValue={inputValue} setInputValue={setInputValue}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={"pr-md-1"} md="12">
                                        <EmailFormGroup inputValue={inputValue} setInputValue={setInputValue}/>
                                    </Col>
                                </Row>
                                <RegisterAddrFormGroup
                                    label="개인 주소"
                                    placeholder="상세주소"
                                    inputValue={inputValue}
                                    setInputValue={setInputValue}
                                />

                            </Form>
                        </CardBody>
                          <CardFooter>
                              <Button className="btn-fill" color="primary" type="submit">
                                  저장
                              </Button>
                          </CardFooter>
                      </Card>}
                </Col>

            </Row>
            }
        </div>
    );
}

export default UserProfile;
