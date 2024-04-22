import React, {useEffect} from 'react';

const ProgCurrentStatus = ({program}) => {
    const [status, setStatus] = React.useState('상태 미정');

    useEffect(() => {
        if(Date.now() < new Date(program?.pgProgStartDate).getTime()) {
            setStatus("프로그램 시작 전")
        }

        if(Date.now() > new Date(program?.pgProgStartDate).getTime() && Date.now() < new Date(program?.pgProgEndDate).getTime()) {
            setStatus("프로그램 진행 중")
        }

        if(Date.now() < new Date(program?.pgProgStartDate).getTime() && Date.now() > new Date(program?.pgProgEndDate).getTime()) {
            setStatus("대기 중")
        }

        if(Date.now() < new Date(program?.pgRegValStartDate).getTime() && Date.now() > new Date(program?.pgRegValEndDate).getTime()) {
            setStatus("교육 신청 중")
        }

        if(Date.now() < new Date(program?.pgInterviewValStartDate).getTime() && Date.now() > new Date(program?.pgInterviewValEndDate).getTime()) {
            setStatus("면접 중")
        }

        if(Date.now() > new Date(program?.pgEduStartDate).getTime() && Date.now() < new Date(program?.pgEduEndDate).getTime()) {
            setStatus("교육 중")
        }

        if(Date.now() > new Date(program?.pgProgEndDate).getTime()) {
            setStatus("프로그램 종료")
        }
    }, [program]);

    return (
        <p className="curr-status">
            {status}
        </p>
    );
};

export default ProgCurrentStatus;