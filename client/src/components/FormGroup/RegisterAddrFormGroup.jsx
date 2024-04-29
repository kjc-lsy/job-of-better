import React, {useEffect, useState} from 'react';
import {Col, FormGroup, Input, Row} from "reactstrap";
import Postcode from "../Plugin/AddrPlugin";

const RegisterAddrFormGroup = ({handleDetailAddrValue ,handleAddrValue, handleZipCodeValue, label, placeholder}) => {
    const [address, setAddress] = useState("");
    const [detailAddr, setDetailAddr] = useState("");

    useEffect(() => {
        handleDetailAddrValue(detailAddr)
        handleAddrValue(address)
    }, [address, detailAddr]);

    return (
        <div>
            <FormGroup className="register_addr">
                <label htmlFor="b_detailAddr">{label}</label>
                <Postcode
                    setAddress={setAddress}
                    handleZipCodeValue={handleZipCodeValue}
                />
                <Row>
                    <Col md={12}>
                        <Input
                            id="b_detailAddr"
                            name="b_detailAddr"
                            placeholder={placeholder}
                            value={detailAddr}
                            onChange={(e)=>setDetailAddr(e.target.value)}
                        />
                    </Col>
                </Row>
            </FormGroup>
        </div>
    );
};

export default RegisterAddrFormGroup;