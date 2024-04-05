import React, {useEffect} from 'react';
import {getRejectedMemNum} from "../../apis/program";

const RejectedNumber = ({pgIdx}) => {
    const [number, setNumber] = React.useState(0);

    useEffect(() => {
        getRejectedMemNum(pgIdx).then(res => {
            setNumber(res.data)
        });
    }, [])

    return (
        <div className="ppl-num">{`${number}명`}</div>
    );
};

export default RejectedNumber;