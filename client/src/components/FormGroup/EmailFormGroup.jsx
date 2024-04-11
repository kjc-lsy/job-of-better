import React, {useEffect, useState} from 'react';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, InputGroup} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

const EmailFormGroup = ({inputValue, setInputValue}) => {

    const [dropdownOpen, setDropdownOpen] = useState(false); // 도메인 토글용
    const [isReadOnly, setIsReadOnly] = useState(true); // 도메인 입력란의 readOnly 상태 관리를 위한 새로운 상태 변수

    useEffect(() => {
        const email = `${inputValue.emailUserName}@${inputValue.domain}`;
        const isValidEmail = /^[A-Za-z0-9_.-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+$/.test(email);

        setInputValue(prevState => ({
            ...prevState,
            email: email,
            validEmail: isValidEmail
        }));
    }, [inputValue.emailUserName, inputValue.domain]);


    // 직접 입력 선택시 이메일 도메인 직접입력 가능
    const handleDomainChange = (domain) => {
        if (domain === '직접 입력') {
            setIsReadOnly(false);
            setInputValue({...inputValue, domain: ''});
        } else {
            setIsReadOnly(true);
            setInputValue({...inputValue, domain: domain});
        }
    };

    return (
        <FormGroup>
            <label>이메일</label>
            <InputGroup className="emailInput">
                <Input
                    value={inputValue.emailUserName}
                    onChange={(e) => setInputValue({
                        ...inputValue,
                        emailUserName: e.target.value
                    })} // value={inputValue.emailUserName}(e.target.value)}
                    placeholder="회사 이메일"
                    name="email"
                    type="text"
                    autoComplete="new-email"
                />
                <span className="">@</span>
                <Input
                    value={inputValue.domain}
                    placeholder="example.com"
                    name="domain"
                    type="text"
                    readOnly={isReadOnly}
                    onChange={(e) => setInputValue({
                        ...inputValue,
                        domain: e.target.value
                    })} // value={inputValue.domain}(e.target.value)}
                />
                <ButtonDropdown isOpen={dropdownOpen} toggle={() => {
                    setDropdownOpen(!dropdownOpen)
                }}>
                    <DropdownToggle caret className="domainSelect">
                        선택 <FontAwesomeIcon icon={faChevronDown}/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() => handleDomainChange('gmail.com')}>gmail.com</DropdownItem>
                        <DropdownItem
                            onClick={() => handleDomainChange('naver.com')}>naver.com</DropdownItem>
                        <DropdownItem
                            onClick={() => handleDomainChange('daum.com')}>daum.com</DropdownItem>
                        <DropdownItem
                            onClick={() => handleDomainChange('nate.com')}>nate.com</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={() => handleDomainChange('직접 입력')}>직접
                            입력</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </InputGroup>
            <div className="text-muted font-italic">
                <small>
                    {
                        inputValue.validEmail && inputValue.emailUserName !== "" && inputValue.domain !== ""
                            ? <span className="text-success font-weight-700">유효한 이메일 입니다.</span>
                            : inputValue.emailUserName !== ""
                                ? <span className="text-danger font-weight-700">유효한 이메일이 아닙니다.</span>
                                : <span>이메일을 입력해주세요</span>
                    }
                </small>
            </div>
        </FormGroup>
    );
};

export default EmailFormGroup;