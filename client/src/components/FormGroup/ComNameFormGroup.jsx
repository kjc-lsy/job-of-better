import React from 'react';
import {FormGroup, Input} from "reactstrap";

const ComNameFormGroup = ({inputValue, setInputValue}) => {
    return (
        <FormGroup>
            <label>회사명</label>
            <Input
                value={inputValue.b_name}
                name="b_name"
                placeholder="사업자등록원에 등록된 회사명을 입력해주세요."
                type="text"
                onChange={e => {
                    setInputValue({...inputValue, b_name: e.target.value})
                }}
            />
        </FormGroup>
    );
};

export default ComNameFormGroup;