import React, {useEffect} from 'react';
import {FormGroup, Input} from "reactstrap";

const PhoneFormGroup = ({inputValue, setInputValue}) => {
    const inputRegexs = {
        phoneRegex: /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/,
    };

    useEffect(() => {
        const isValid = inputRegexs.phoneRegex.test(inputValue.phone);
        setInputValue(prev => ({...prev, validPhone: isValid}));
    }, [inputValue.phone]);

    return (
        <FormGroup>
            <label>전화번호</label>
            <Input
                vlaue={inputValue.phone}
                placeholder="연락가능한 전화번호를 입력해주세요."
                type="text"
                onChange={e => setInputValue({...inputValue, phone: e.target.value})}
            />
            <div className="text-muted font-italic">
                <small>
                    {
                        inputValue.validPhone && inputValue.phone !== ""
                            ? <span className="text-success font-weight-700">유효한 번호 입니다.</span>
                            : inputValue.phone !== ""
                                ? <span className="text-danger font-weight-700">유효한 번호가 아닙니다.</span>
                                : <span>"-"를 뺀 번호를 입력해주세요</span>
                    }
                </small>
            </div>
        </FormGroup>
    );
};

export default PhoneFormGroup;