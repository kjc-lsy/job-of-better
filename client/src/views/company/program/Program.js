import React, {useEffect, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

// reactstrap components
import {Button, Card, Col, Row,} from "reactstrap";
import {getPrograms} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";
import {useNavigate} from "react-router-dom";
import programAddImg from "../../../assets/img/program-add.png";
import ProgramCard from "../../../components/Program/ProgramCard";

function Program() {
    const {isLogin} = useAuth();
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

    // 로그인 처리가 완료 되면 그 이후에 함수를 실행
    useEffect(() => {
        if (isLogin) {
            loadPrograms();
        }
    }, [isLogin]);

    const loadPrograms = async () => {
        const response = await getPrograms();
        setPrograms(response.data);
    }

    const handleAddBtn = () => {
        navigate('/company/program-insert')
    }

    return (
        <div className="content program">
            <Row>
                {programs.map((program, index) => {
                    return (
                        <Col md="6" key={index}>
                            <ProgramCard
                                program={program}
                                loadPrograms={loadPrograms}
                            />
                        </Col>
                    )
                })}
                <Col md="6" className="text-center">
                    <Card className="program-add">
                        <Button onClick={handleAddBtn}>
                            <img src={programAddImg} alt="프로그램 추가"/>
                            <div>학생들을 모집, 교육할 프로그램을 기획해주세요</div>
                            <Button className="inner-btn">프로그램 추가</Button>
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Program;