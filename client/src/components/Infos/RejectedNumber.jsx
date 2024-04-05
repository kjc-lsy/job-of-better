import React, {useEffect} from 'react';
import {getRejectedMemNum} from "../../apis/program";

const RejectedNumber = ({program}) => {
    const [number, setNumber] = React.useState(0);

    useEffect(() => {
        setNumber(getRejectedMemNum(program.pgIdx))
    }, [])

    return (
        <div className="ppl-num">number</div>
    );
};

export default RejectedNumber;