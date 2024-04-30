import React from 'react';
import {FormGroup} from "reactstrap";
import {DatePicker} from "rsuite";

const BirthDateFormGroup = ({inputValue, setInputValue}) => {
    return (
        <FormGroup className="birth-date-form">
            <label>생년월일</label>
            <DatePicker
                format="yyyy-MM-dd"
                defaultValue={new Date(new Date().getTime() - 1000*60*60*24*365*18)}
                onChange={date => setInputValue({...inputValue, birthDate: date})}
                oneTap
            />
            <div className="text-muted font-italic">
                <small>
                    {
                        inputValue.birthDate !== ""
                            ? <span className="text-success font-weight-700">유효한 생년월일 입니다.</span>
                            : <span>생년월일을 입력해주세요</span>
                    }
                </small>
            </div>
        </FormGroup>
    );
};

export default BirthDateFormGroup;