import React, {useEffect} from 'react';
import {getApprovedMemNum} from "../../apis/program";

const ApprovedNumber = ({program}) => {
    const [number, setNumber] = React.useState(0);

    useEffect(() => {
        setNumber(getApprovedMemNum(program.pgIdx))
    }, [])

    return (
        <div className="ppl-num">number</div>
    );
};

export default ApprovedNumber;