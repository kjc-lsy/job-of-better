import React from "react";
import { BeatLoader } from "react-spinners";

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
    return (
        <div>
            <BeatLoader
                color="#36d7b7"
                loading={loading}
                cssOverride={override}
                size={15}
            />
        </div>
    );
};

export default Loading;