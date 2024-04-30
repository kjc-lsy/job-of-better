import React, {useEffect} from 'react';
import {FormGroup, Input} from "reactstrap";

const BTelFormGroup = ({inputValue, setInputValue}) => {
    const inputRegexs = {
        phoneRegex: /^[0-9]*$/,
    };

    useEffect(() => {
        const isValid = inputRegexs.phoneRegex.test(inputValue.b_tel);
        setInputValue(prev => ({...prev, validBTel: isValid}));
    }, [inputValue.b_tel]);

    return (
        <FormGroup>
            <label>회사 전화번호</label>
            <Input
                vlaue={inputValue.b_tel}
                placeholder="연락가능한 회사 전화번호를 입력해주세요."
                type="text"
                maxLength="11"
                onChange={e => setInputValue({...inputValue, b_tel: e.target.value})}
            />
            <div className="text-muted font-italic">
                <small>
                    {
                        inputValue.validBTel && inputValue.b_tel !== ""
                            ? <span className="text-success font-weight-700">유효한 번호 입니다.</span>
                            : inputValue.b_tel !== ""
                                ? <span className="text-danger font-weight-700">유효한 번호가 아닙니다.</span>
                                : <span>"-"를 뺀 번호를 입력해주세요</span>
                    }
                </small>
            </div>
        </FormGroup>
    );
};

export default BTelFormGroup;