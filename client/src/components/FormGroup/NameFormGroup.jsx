import React, {useEffect} from 'react';
import {FormGroup, Input} from "reactstrap";

const NameFormGroup = ({inputValue, setInputValue}) => {

    const inputRegexs = {
        // 닉네임 : 영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내
        nameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
    };

    useEffect(() => {
        if (inputValue.name.match(inputRegexs.nameRegex)) {
            setInputValue({...inputValue, validName: true});
        } else {
            setInputValue({...inputValue, validName: false});
        }
    }, [inputValue.name])

    return (
        <FormGroup>
            <label>이름</label>
            <Input
                value={inputValue.name}
                name="name"
                placeholder="이름"
                onChange={(e) => {
                    setInputValue({...inputValue, name: e.target.value})
                }}
                type="text"
            />
            <div className="text-muted font-italic">
                <small>
                    {
                        inputValue.validName && inputValue.name !== ""
                            ? <span className="text-success font-weight-700">유효한 이름 입니다.</span>
                            : inputValue.name !== ""
                                ? <span className="text-danger font-weight-700">유효한 이름이 아닙니다.</span>
                                : <span>영어 대/소문자, 숫자, 한글을 사용해주세요</span>
                    }
                </small>
            </div>
        </FormGroup>
    );
};

export default NameFormGroup;