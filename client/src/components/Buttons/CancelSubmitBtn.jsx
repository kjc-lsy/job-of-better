import React from 'react';
import {cancelRegister} from "../../apis/program";
import {Button} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContextProvider";

const CancelSubmitBtn = () => {
    const navigate = useNavigate();
    const {setLoginUser} = useAuth();
    const handleCancelBtn = async (id) => {
        if (window.confirm('프로그램 신청을 취소합니다')) {
            await cancelRegister();
            await setLoginUser();

            navigate('/user/program')
        }
    }

    return (
        <div>
            <Button onClick={handleCancelBtn}>취소하기</Button>
        </div>
    );
};

export default CancelSubmitBtn;