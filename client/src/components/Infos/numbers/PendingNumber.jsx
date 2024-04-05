import React, {useEffect} from 'react';
import {getPendingMemNum} from "../../../apis/program";

const PendingNumber = ({pgIdx}) => {
    const [number, setNumber] = React.useState(0);

    useEffect(() => {
        getPendingMemNum(pgIdx).then(res => {
            setNumber(res.data)
        });
    }, [])

    return (
        <div className="ppl-num">{`${number}명`}</div>
    );
};

export default PendingNumber;