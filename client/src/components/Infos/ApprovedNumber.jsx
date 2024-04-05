import React, {useEffect} from 'react';
import {getApprovedMemNum} from "../../apis/program";

const ApprovedNumber = ({pgIdx}) => {
    const [number, setNumber] = React.useState(0);

    useEffect(() => {
        getApprovedMemNum(pgIdx).then(res => {
            setNumber(res.data)
        });
    }, [])

    return (
        <div className="ppl-num">{`${number}명`}</div>
    );
};

export default ApprovedNumber;