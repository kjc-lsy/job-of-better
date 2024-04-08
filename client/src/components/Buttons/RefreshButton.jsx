import React from 'react';
import {Button} from "rsuite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";

const RefreshButton = (props) => {

    return (
        <Button className="refresh-btn" appearance="default"  {...props}>
            <FontAwesomeIcon icon={faRotateRight}/>
        </Button>
    );
};

export default RefreshButton;