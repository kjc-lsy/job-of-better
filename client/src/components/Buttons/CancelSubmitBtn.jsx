import React from 'react';
import {cancelRegister} from "../../apis/program";
import {Button} from "reactstrap";

const CancelSubmitBtn = () => {
    const handleCancelBtn = async (id) => {
        if (window.confirm('프로그램 신청을 취소합니다')) {
            await cancelRegister();
        }
    }

    return (
        <div>
            <Button onClick={handleCancelBtn}>취소하기</Button>
        </div>
    );
};

export default CancelSubmitBtn;