import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";

const GenderFormGroup = ({inputValue, setInputValue}) => {
    return (
        <FormGroup>
            <label htmlFor="">성별</label>
            <div className="custom-gender custom-control custom-control-alternative custom-checkbox">
                <FormGroup check>
                    <Input
                        className="custom-control-input"
                        type="radio"
                        name="gender"
                        value="m"
                        id="registerMale"
                        checked={inputValue.gender === "m"}
                        onChange={e => setInputValue({
                            ...inputValue,
                            gender: e.target.value
                        })}
                    />
                    <Label
                        className="custom-control-label"
                        htmlFor="registerMale"
                    >
                                            <span className="text-muted">
                                            남성
                                            </span>
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        className="custom-control-input"
                        type="radio"
                        name="gender"
                        value="f"
                        id="registerFemale"
                        checked={inputValue.gender === "f"}
                        onChange={e => setInputValue({
                            ...inputValue,
                            gender: e.target.value
                        })}
                    />
                    <Label
                        className="custom-control-label"
                        htmlFor="registerFemale"
                    >
                        <span className="text-muted">여성</span>
                    </Label>
                </FormGroup>
            </div>
        </FormGroup>
    );
};

export default GenderFormGroup;