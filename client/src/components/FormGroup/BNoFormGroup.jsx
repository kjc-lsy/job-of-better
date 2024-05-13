import React, {useContext, useEffect} from 'react';
import {Button, Col, FormGroup, Input, Row} from "reactstrap";
import {LoadingContext} from "../../contexts/LoadingProvider";
import * as auth from "../../apis/auth";
import {useAuth} from "../../contexts/AuthContextProvider";

const BNoFormGroup = ({inputValue, setInputValue, disabled}) => {
    const {setLoading} = useContext(LoadingContext)
    const {roles} = useAuth();

    useEffect(() => {
        handleDuplicateBNo();
    }, [inputValue.validBNo]);

    const handleDuplicateBNo = () => {
        //console.log("handleDuplicateBNo")
        //console.log(inputValue)
        auth.checkDuplicateBNo(inputValue.b_no)
            .then(response => {
                if (response.data) {
                    setInputValue((prev) => ({...prev, validDuplicateBNo: "true"}));
                } else {
                    setInputValue((prev) => ({...prev, validDuplicateBNo: "false"}));
                }

            })
            .catch(error => {
                console.error(error);
            }).finally(
            () => {
                setLoading(false);
            })
    };
    const handleChange = (e) => {
        let sanitizedValue = e.target.value.replace(/[^0-9.-]/g, '');

        let formattedValue = "";
        if (sanitizedValue) {
            sanitizedValue = sanitizedValue.replace(/-/g, '');
            const match = sanitizedValue.match(/^(\d{1,3})(\d{1,2})?(\d{1,5})?$/);
            if (match) {
                formattedValue = match.slice(1).filter(Boolean).join("-");
            }
        }
        setInputValue({...inputValue, b_no: formattedValue, validBNo: "", validDuplicateBNo: ""});
    };

    const validateBNoMsg = () => {
        if (inputValue.b_no !== "") {
            if (inputValue.validBNo === "true") {
                if (inputValue.validDuplicateBNo === "true") {
                    return <span className="text-danger font-weight-700">중복된 사업자 등록 번호 입니다.</span>;
                } else if (inputValue.validDuplicateBNo === "false") {
                    return <span className="text-success font-weight-700">유효한 사업자 등록 번호 입니다</span>;
                } else {
                    return <span><b className="text-danger">발급일 90일 이내</b> 사업자등록증명원의 발급번호만 가능합니다. (사업자등록증 불가)</span>;
                }
            } else if (inputValue.validBNo === "false") {
                return <span className="text-danger font-weight-700">유효하지 않은 사업자 등록 번호 입니다</span>;
            } else {
                return <span><b className="text-danger">발급일 90일 이내</b> 사업자등록증명원의 발급번호만 가능합니다. (사업자등록증 불가)</span>;
            }
        } else {
            return <span><b className="text-danger">발급일 90일 이내</b> 사업자등록증명원의 발급번호만 가능합니다. (사업자등록증 불가)</span>;
        }
    }

    // 사업자등록번호 조회
    const getJsonData = async () => {
        setLoading(true);
        const data = {
            "b_no": [(inputValue.b_no).replaceAll("-", "")] // inputValue로부터 b_no 값을 가져옵니다.
        };

        try {
            const response = await fetch("https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=vXG2ZQwLkIqqESDl%2BCqEtOM9nkKJcMvZOTu1%2F4SLsCLfVm%2FKMFiQc1jVDOjHs9ttLpMGl%2FfuNldQUP%2FOekqJjA%3D%3D", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (result.data[0].b_stt !== "") {
                setInputValue({...inputValue, validBNo: "true"});
            } else {
                setInputValue({...inputValue, validBNo: "false"});
            }
        } catch (error) {
            console.error(error);
        } finally {
            //handleDuplicateBNo(); // handleDuplicateBNo 함수 호출
            setLoading(false);
        }
    }

    return (
        <FormGroup className="register_addr">
            <label>사업자 등록 번호</label>
            <Row>
                <Col md={10}>
                    <Input
                        value={inputValue.b_no}
                        name="b_no"
                        placeholder="사업자 등록 번호"
                        type="text"
                        maxLength="12"
                        onChange={handleChange}
                        disabled={disabled}
                    />
                    <div className="text-muted font-italic">
                        <small>{validateBNoMsg()}</small>
                    </div>
                </Col>
                {roles.company
                    ?
                    null
                    :
                    <Col md={2}>
                        <Button type="button" onClick={async () => {
                            await getJsonData();
                        }
                        }>인증하기</Button>
                    </Col>
                }
            </Row>
        </FormGroup>
    );
};

export default BNoFormGroup;