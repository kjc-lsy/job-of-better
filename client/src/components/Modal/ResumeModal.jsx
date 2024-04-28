import React from 'react';
import {Modal} from "rsuite";
import ResumeCard from "../Card/ResumeCard";

const ResumeModal = ({isOpen, setIsOpen, memIdx}) => {

    return (
        <Modal
            open={isOpen}
            onClose={()=> setIsOpen()}
            overflow={true}
            size={"sm"}
        >
            <Modal.Body>
                <ResumeCard
                    idx={memIdx}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ResumeModal;