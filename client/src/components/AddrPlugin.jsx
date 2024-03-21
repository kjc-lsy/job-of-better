import React, {useEffect, useState} from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Button, Col, Input, Row } from "reactstrap";

const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const Postcode = ({inputValue,setInputValue}) => {
    const [address, setAddress] = useState('');
    const open = useDaumPostcodePopup(scriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        console.log(data);
        setAddress(data);
        setInputValue({...inputValue ,b_address: fullAddress, b_zipCode: data.zonecode});
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <Row>
            <Col md={7}>
                <Input
                    id="exampleCity"
                    name="address"
                    value={address.address ? address.address : ''}
                    placeholder="도로명주소"
                />
            </Col>
            <Col md={3}>
                <Input
                    id="exampleState"
                    name="zip"
                    value={address.zonecode ? address.zonecode : ''}
                    placeholder="우편번호"
                    disabled
                />
            </Col>
            <Col>
                <Button type='button' onClick={handleClick}>
                    우편번호 찾기
                </Button>
            </Col>
        </Row>
    );
};

export default Postcode;
