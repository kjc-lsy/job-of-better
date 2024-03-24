import React, {useEffect, useState} from "react";

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip,
} from "reactstrap";

import {useAuth} from "../../contexts/AuthContextProvider";
import {getAllPrograms} from "../../apis/program";


function ChoiceProgram() {
    const {isLogin} = useAuth();
    const [programs, setPrograms] = useState([]);

    // 로그인 처리가 완료 되면 그 이후에 함수를 실행
    useEffect(() => {
        if (isLogin) {
            loadPrograms()
        } else {
            console.log("Not Login");
        }
    }, [isLogin]);

    const loadPrograms = async () => {
        await getAllPrograms()
            .then((response) =>  {
                setPrograms(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error(error));
        //setPrograms(response.data);
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h3">프로그램 선택</CardTitle>
                            <p>학습 커리큘럼을 선택해주세요.  프로그램명과 프로그램을 제공하는 기업을 자세히 확인해주세요.</p>
                        </CardHeader>
                        <CardBody>
                            <Row>
                            {programs.map((program, index) => {
                                return (
                                    <Col md={4}>
                                        <Button key={index} className="programBox">
                                            <h4>{program.pgTitle}</h4>
                                            <div dangerouslySetInnerHTML={{ __html: program.pgContentSummary }} />
                                            <ul>
                                                <li><b>인원</b> 10명</li>
                                                <li><b>프로그램 기간</b> </li>
                                            </ul>
                                        </Button>
                                    </Col>
                                );
                            })}
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
            </div>
        </>
    );
}

export default ChoiceProgram;
