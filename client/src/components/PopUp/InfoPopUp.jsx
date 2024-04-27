import React from 'react';
import {Popover, Whisper} from "rsuite";
import {ReactComponent as InfoIcon} from "../../assets/img/info.svg";

const InfoPopUp = ({children}) => {
    return (
        <Whisper speaker={<Popover>{children}</Popover>}>
            <InfoIcon width={16} height={16} fill={"var(--border-color)"}/>
        </Whisper>
    );
};

export default InfoPopUp;