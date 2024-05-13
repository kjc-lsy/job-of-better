import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, CardTitle, Table} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getPrograms} from "../../apis/program";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const ProgramListCard = () => {
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();
    const pgStatusLabel = {'Prestart':'시작 전','Ongoing':'진행 중','Ended':'종료','Registration':'가입 중','Interviewing':'면접 중','Educating':'교육 중'};

    useEffect(() => {
        getPrograms().then((res) => {
            setPrograms(res.data);
        })
    }, []);

    return (
        <Card className="card-user-box">
            <CardHeader>
                <CardTitle tag="h4">프로그램 목록</CardTitle>
            </CardHeader>
            <CardBody>
                <Table className="tablesorter">
                    <thead className="text-primary">
                    <tr>
                        <th className="text-center" width={200}>제목</th>
                        <th className="text-center" width={100}>상태</th>
                        <th className="text-center" width={100}>바로가기</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        programs
                            ?
                            programs.map((program) => (
                                <tr>
                                    <td>
                                        <div className="text-center ellipsis">
                                            {program.pgTitle}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        {pgStatusLabel[program.pgStatus]}
                                    </td>
                                    <td className="text-center">
                                        <a onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/company/program-details/" + program.pgIdx)
                                        }}>
                                            <FontAwesomeIcon size={"lg"} icon={faArrowCircleRight}/>
                                        </a>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={5} className="text-center">프로그램이 없습니다.</td>
                            </tr>
                    }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default ProgramListCard;