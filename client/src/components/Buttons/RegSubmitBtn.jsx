import React from 'react';
import {registerProgram} from "../../apis/program";
import {Button} from "reactstrap";
import {useAuth} from "../../contexts/AuthContextProvider";
import {useNavigate} from "react-router-dom";

const RegSubmitBtn = ({program}) => {
    const {setLoginUser, user} = useAuth();
    const navigate = useNavigate();

    const handleRegisterBtn = async ({pgIdx, pgComIdx, pgTitle}) => {
        if (window.confirm(`[${pgTitle}] 프로그램을 신청합니다`)) {
            await registerProgram(pgIdx, pgComIdx);
            await setLoginUser();

            navigate('/user/waiting-reg')
        }
    }
    return (
        <Button onClick={() => handleRegisterBtn(program)}>신청하기</Button>
    );
};

export default RegSubmitBtn;