import React, {useEffect} from 'react';
import {FormGroup, Input} from "reactstrap";

const PasswordFormGroup = ({inputValue, setInputValue}) => {
    const inputRegexs = {
        // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
        pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    };

    useEffect(() => {
        if (RegExp(inputRegexs.pwRegex).exec(inputValue.password)) {
            setInputValue({...inputValue, validPassword: true});
        } else {
            setInputValue({...inputValue, validPassword: false});
        }
    }, [inputValue.password]);
    return (
        <FormGroup>
            <label>비밀번호</label>
            <Input
                value={inputValue.password}
                placeholder="비밀번호"
                name="password"
                type="password"
                onChange={(e) => {
                    setInputValue({...inputValue, password: e.target.value})
                }}
                autoComplete="new-password"
            />
            <div className="text-muted font-italic">
                <small>
                    {" "}
                    {inputValue.validPassword && inputValue.password !== ""
                        ? <span className="text-success font-weight-700">유효한 비밀번호 입니다.</span>
                        : inputValue.password !== ""
                            ? <span className="text-danger font-weight-700">유효하지 않은 비밀번호 입니다</span>
                            : <span>하나의 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다</span>
                    }
                </small>
            </div>
        </FormGroup>
    );
};

export default PasswordFormGroup;