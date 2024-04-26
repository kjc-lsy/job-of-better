import React from 'react';
import {Button, Loader, Modal} from 'rsuite'

const MagnifyingModal = ({buttonName,component}) => {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEntered = () => {
        setTimeout(() => setRows(80), 2000);
    };

    return (
        <>
            <Button onClick={() => handleOpen()}>
                {buttonName}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                onEntered={handleEntered}
                onExited={() => {
                    setRows(0);
                }}
                overflow={true}
            >
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {rows ? component : (
                        <div style={{ textAlign: 'center' }}>
                            <Loader size="md" />
                        </div>
                    )  }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MagnifyingModal;