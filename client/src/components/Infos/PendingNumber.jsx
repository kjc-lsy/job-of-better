import React, {useEffect} from 'react';
import {getPendingMemNum} from "../../apis/program";

const PendingNumber = ({program}) => {
    const [number, setNumber] = React.useState(0);

    useEffect(() => {
        setNumber(getPendingMemNum(program.pgIdx))
    }, [])

    return (
        <div className="ppl-num">number</div>
    );
};

export default PendingNumber;