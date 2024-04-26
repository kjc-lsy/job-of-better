import React from 'react';
import {Message} from "rsuite";

/**
 * type : info, success, warning, error
 */
const AlertMessage = ({type, children, ...rest}) => {
    return (
        <Message
            showIcon
            type={type}
            closable
            {...rest}
        >
            <strong>{type}!</strong> {children}
        </Message>
    );
};

export default AlertMessage;