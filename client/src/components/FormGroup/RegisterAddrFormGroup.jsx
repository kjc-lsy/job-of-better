import React from 'react';
import {Col, FormGroup, Input, Row} from "reactstrap";
import Postcode from "../AddrPlugin";

const RegisterAddrFormGroup = ({inputValue, setInputValue}) => {
    return (
        <div>
            <FormGroup className="register_addr">
                <label htmlFor="b_detailAddr">회사 주소</label>
                <Postcode
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
                <Row>
                    <Col md={12}>
                        <Input
                            id="b_detailAddr"
                            name="b_detailAddr"
                            placeholder="상세주소"
                            value={inputValue.b_detailAddr}
                            onChange={e => {
                                setInputValue({...inputValue, b_detailAddr: e.target.value})
                            }}
                        />
                    </Col>
                </Row>
            </FormGroup>
        </div>
    );
};

export default RegisterAddrFormGroup;