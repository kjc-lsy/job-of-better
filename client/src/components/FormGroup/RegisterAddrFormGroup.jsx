import React from 'react';
import {Col, FormGroup, Input, Row} from "reactstrap";
import Postcode from "../Plugin/AddrPlugin";

const RegisterAddrFormGroup = ({inputValue, setInputValue, label, placeholder}) => {

    return (
        <div>
            <FormGroup className="register_addr">
                <label htmlFor="b_detailAddr">{label}</label>
                <Postcode
                    setInputValue={setInputValue}
                />
                <Row>
                    <Col md={12}>
                        <Input
                            id="b_detailAddr"
                            name="b_detailAddr"
                            placeholder={placeholder}
                            value={inputValue?.detailAddr}
                            onChange={(e) => setInputValue(prev => ({...prev, detailAddr: e.target.value}))}
                        />
                    </Col>
                </Row>
            </FormGroup>
        </div>
    );
};

export default RegisterAddrFormGroup;