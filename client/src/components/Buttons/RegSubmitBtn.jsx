import React from 'react';
import {registerProgram} from "../../apis/program";
import {Button} from "reactstrap";
import {useAuth} from "../../contexts/AuthContextProvider";

const RegSubmitBtn = ({program}) => {
    const {setLoginUser} = useAuth();

    const handleRegisterBtn = async ({pgIdx, pgComIdx, pgTitle}) => {
        if (window.confirm(`[${pgTitle}] 프로그램을 신청합니다`)) {
            await registerProgram(pgIdx, pgComIdx);
            await setLoginUser();
        }
    }
    return (
        <Button onClick={() => handleRegisterBtn(program)}>신청하기</Button>
    );
};

export default RegSubmitBtn;