import React from 'react';
import {Button, Loader, Modal} from 'rsuite'

const MagnifyingModal = ({buttonName, component}) => {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={() => handleOpen()}>
                {buttonName}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                overflow={true}
                size={"lg"}
            >
                <Modal.Body>
                    {isLoading
                        ?
                        <div style={{textAlign: 'center'}}>
                            <Loader size="md"/>
                        </div>
                        :
                        component
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MagnifyingModal;