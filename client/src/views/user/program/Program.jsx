import React, {useEffect, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

// reactstrap components
import {Col, Row,} from "reactstrap";
import {getPrograms} from "../../../apis/program";
import {useAuth} from "../../../contexts/AuthContextProvider";
import {useNavigate} from "react-router-dom";
import UserProgramCard from "../../../components/Card/UserProgramCard";

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

    return (
        <div className="content program">
            <Row>
                <Col>
                    <span className="h3">프로그램 선택</span>
                    <p>학습 커리큘럼을 선택해주세요. 프로그램명과 프로그램을 제공하는 기업을 자세히 확인해주세요.</p>
                </Col>
            </Row>
            <Row>
                {programs.map((program, index) => {
                    return (
                        <Col md="6" key={index}>
                            <UserProgramCard
                                program={program}
                                loadPrograms={loadPrograms}
                            />
                        </Col>
                    )
                })}
            </Row>
        </div>
    );
}

export default Program;