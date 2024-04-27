import React, {useEffect, useState} from 'react';
import {Button, Input, Modal} from "rsuite";
import {getInterviewCommet, updateInterviewComment} from "../../apis/company";
import {useAlert} from "../Alert/useAlert";

const InterviewCommentModal = ({isOpen, setIsOpen, memIdx}) => {
    const [comment, setComment] = useState("");
    const sendAlert = useAlert();
    const handleClose = () => setIsOpen();

    useEffect(() => {
        if (isOpen) {
            getInterviewCommet(memIdx).then(res => {
                setComment(res.data)
            }).catch((e) => {
                sendAlert("error", e);
            })
        }
    }, [isOpen]);

    const handleClick = () => {
        updateInterviewComment(memIdx, comment).then(res => {
            sendAlert("success", "면접 후기 등록 완료")
            setIsOpen(false)
        })

    }
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            overflow={true}
            size={"sm"}
        >
            <Modal.Body>
                <Input as="textarea" rows={20} placeholder={"학생 면접 후기를 입력해주세요"} value={comment} onChange={setComment}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClick} style={{background: "var(--main-color)", color: "white"}}>저장</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InterviewCommentModal;