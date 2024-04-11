import React, {useEffect} from 'react';
import * as auth from "../../apis/auth";
import {Button, Col, FormGroup, Input, Row} from "reactstrap";

const UsernameFormGroup = ({inputValue, setInputValue}) => {
    const inputRegexs = {
        usernameRegex: /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/,
    };

    useEffect(() => {
        if (RegExp(inputRegexs.usernameRegex).exec(inputValue.username)) {
            setInputValue(prevState => ({
                ...prevState,
                validUsername: true
            }));
        } else {
            setInputValue(prevState => ({
                ...prevState,
                validUsername: false
            }));
        }
    }, [inputValue.username])
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputValue(prevState => ({
            ...prevState,
            [name]: value,
            validDuplicateUsername: ""
        }));
    };

    const validateDuplicateUsername = () => {
        auth.checkDuplicateUsername(inputValue.username)
            .then(response => {
                if (response.data) {
                    setInputValue({...inputValue, validDuplicateUsername: "false"});
                } else {
                    setInputValue({...inputValue, validDuplicateUsername: "true"});
                }
            }).catch(error => {
            console.error("checkDuplicateUsername error : ", error);
        });
    }
    return (
        <FormGroup className="register_addr">
            <label>아이디</label>
            <Row>
                <Col md={10}>
                    <Input
                        value={inputValue.username}
                        name="username"
                        placeholder="아이디"
                        type="text"
                        onInput={handleInputChange}
                    />
                    <div className="text-muted font-italic">
                        <small>
                            {inputValue.validUsername && inputValue.username !== ""
                                ?
                                inputValue.validDuplicateUsername === "true"
                                    ?
                                    <span className="text-success font-weight-700">유효한 아이디 입니다</span>
                                    :
                                    inputValue.validDuplicateUsername === "false"
                                        ?
                                        <span
                                            className="text-danger font-weight-700">중복된 아이디 입니다.</span>
                                        :
                                        <span
                                            className="text-danger font-weight-700">아이디 중복 확인해주세요,</span>
                                :
                                inputValue.username !== ""
                                    ?
                                    <span className="text-danger font-weight-700">유효하지 않은 아이디 입니다</span>
                                    :
                                    <span> 문자, 영문자, 숫자를 사용해주세요</span>
                            }
                        </small>
                    </div>
                </Col>
                <Col md={2}><Button onClick={validateDuplicateUsername}>중복확인</Button></Col>
            </Row>
        </FormGroup>
    );
};

export default UsernameFormGroup;