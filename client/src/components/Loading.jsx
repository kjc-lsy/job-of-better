import React, {useEffect, useState} from "react";
import {BeatLoader} from "react-spinners";

const override = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform:"translate(-50% , -50%)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
};

const Loading = ({ loading }) => {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                setLoad(loading);
            }, 10);

            return () => clearTimeout(timer);
        }else {
            setLoad(loading);
        }
    }, [loading]);
    return (
        <div>
            <BeatLoader
                color="#36d7b7"
                loading={load}
                cssOverride={override}
                size={15}
            />
        </div>
    );
};

export default Loading;