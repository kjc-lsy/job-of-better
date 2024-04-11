import React, {useEffect} from 'react';
import {FormGroup, Input} from "reactstrap";

const CheckPasswordFormGroup = ({inputValue, setInputValue}) => {

    const inputRegexs = {
        // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
        pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    };

    useEffect(() => {
        if (inputValue.checkPassword === inputValue.password && inputValue.checkPassword.match(inputRegexs.pwRegex)) {
            setInputValue({...inputValue, validCheckPassword: true});
        } else {
            setInputValue({...inputValue, validCheckPassword: false});
        }

    }, [inputValue.checkPassword])

    return (
        <FormGroup>
            <label>비밀번호 확인</label>
            <Input
                value={inputValue.checkPassword}
                placeholder="비밀번호 확인"
                name="checkPassword"
                type="password"
                onChange={(e) => {
                    setInputValue({...inputValue, checkPassword: e.target.value})
                }}
                autoComplete="new-password"
            />
            <div className="text-muted font-italic">
                <small>
                    {" "}
                    {inputValue.validCheckPassword && inputValue.checkPassword !== ""
                        ? <span className="text-success font-weight-700">비밀번호가 일치합니다</span>
                        : inputValue.checkPassword !== ""
                            ? <span className="text-danger font-weight-700">비밀번호가 일치하지 않습니다</span>
                            : <span>비밀번호를 확인해야 합니다</span>
                    }
                </small>
            </div>
        </FormGroup>
    );
};

export default CheckPasswordFormGroup;