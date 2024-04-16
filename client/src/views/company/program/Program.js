import React, {useEffect, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

// reactstrap components
import {Button, Card, Col, Row,} from "reactstrap";
import {getPrograms} from "../../../apis/program";
import {useNavigate} from "react-router-dom";
import programAddImg from "../../../assets/img/program-add.png";
import ComProgramCard from "../../../components/Card/ComProgramCard";
import {useLoading} from "../../../contexts/LoadingProvider";

function Program() {
    const [programs, setPrograms] = useState([]);
    const {loading, setLoading} = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        loadPrograms();
    }, []);

    const loadPrograms = async () => {
        setLoading(true)
        const response = await getPrograms();
        setPrograms(response.data);
        setLoading(false)
    }

    const handleAddBtn = () => {
        navigate('/company/program-insert')
    }

    return (
        <div className="content program">
            {
                loading
                    ?
                    null
                    :
                    <Row>
                        {programs.map((program, index) => {
                            return (
                                <Col md="6" key={index}>
                                    <ComProgramCard
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
            }
        </div>
    );
}

export default Program;