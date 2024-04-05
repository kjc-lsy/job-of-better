import React, {useEffect} from 'react';
import {getTotalMemNum} from "../../../apis/program";

const TotalRegNumber = ({pgIdx}) => {
    const [number, setNumber] = React.useState(0);

    useEffect(() => {
        getTotalMemNum(pgIdx).then(res => setNumber(res.data));
    }, [])

    return (
        <div className="ppl-num">{`${number}명`}</div>
    );
};

export default TotalRegNumber;