import React from 'react';
import {Button, ButtonToolbar, Notification} from "rsuite";

const NotificationMessage = ({type, toaster,children}) => {
    return (
        <Notification type={type} header={`${type}!`} closable>
            <p>{children}</p>
            <hr />
            <ButtonToolbar>
                <Button appearance="primary" onClick={() => toaster.clear()}>Ok</Button>
            </ButtonToolbar>
        </Notification>
    );
};

export default NotificationMessage;