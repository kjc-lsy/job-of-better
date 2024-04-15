import React, {useEffect} from 'react';
import {getRegisteredMemNum} from "../../../apis/program";

const RegisteredNumber = ({pgIdx}) => {
    const [number, setNumber] = React.useState(0);

    useEffect(() => {
        getRegisteredMemNum(pgIdx).then(res => {
            setNumber(res.data)
        });
    }, [])

    return (
        <div className="ppl-num">{`${number}명`}</div>
    );
};

export default RegisteredNumber;