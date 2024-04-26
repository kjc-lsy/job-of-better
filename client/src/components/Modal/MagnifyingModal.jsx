import React from 'react';
import {Button, Loader, Modal} from 'rsuite'
import PdfViewer from "../Viewer/PdfViewer";

const MagnifyingModal = () => {
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
                보기
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                onEntered={handleEntered}
                onExited={() => {
                    setRows(0);
                }}
                overflow={false}
            >
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {rows ? (
                        <PdfViewer/>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <Loader size="md" />
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MagnifyingModal;