import React, {useEffect} from 'react';
import {FormGroup, Input} from "reactstrap";

const CeoNameFormGroup = ({inputValue, setInputValue}) => {

    useEffect(() => {
        if (RegExp(/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/).exec(inputValue.b_ceoName)) {
            setInputValue({...inputValue, validBCeoName: true});
        } else {
            setInputValue({...inputValue, validBCeoName: false});
        }
    }, [inputValue.b_ceoName]);

    return (
        <FormGroup>
            <label>대표자명</label>
            <Input
                value={inputValue.b_ceoName}
                name="b_ceoName"
                placeholder="사업자증명원에 등록된 대표자명을 입력해주세요."
                type="text"
                onChange={e => {
                    setInputValue({...inputValue, b_ceoName: e.target.value})
                }}
            />
            <div className="text-muted font-italic">
                <small>
                    {" "}
                    {inputValue.validBCeoName && inputValue.b_ceoName !== ""
                        ? <span className="text-success font-weight-700">유효한 이름 입니다</span>
                        : inputValue.b_ceoName !== ""
                            ? <span className="text-danger font-weight-700">유효하지 않은 이름 입니다</span>
                            : <span></span>
                    }
                </small>
            </div>
        </FormGroup>
    );
};

export default CeoNameFormGroup;