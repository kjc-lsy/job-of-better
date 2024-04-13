import React from 'react';
import {registerProgram} from "../../apis/program";
import {Button} from "reactstrap";
import {useNavigate} from "react-router-dom";

const RegSubmitBtn = ({program}) => {
    const navigate = useNavigate();
    const handleRegisterBtn = async ({pgIdx, pgComIdx, pgTitle}) => {
        if (window.confirm(`[${pgTitle}] 프로그램을 신청합니다`)) {
            await registerProgram(pgIdx, pgComIdx);
            navigate('../waiting-reg');
        }
    }
    return (
        <Button onClick={() => handleRegisterBtn(program)}>신청하기</Button>
    );
};

export default RegSubmitBtn;