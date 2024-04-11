import React, {useEffect, useState} from "react";

// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table,} from "reactstrap";
import {useAuth} from "../../contexts/AuthContextProvider";
import {getAllUserMembers} from "../../apis/user";

function MemberList() {
    const {isLogin} = useAuth()
    const [userList, setUserList] = useState(null)

    useEffect(() => {
        if (isLogin) {
            getAllUserMembers().then(res => {
                setUserList(res.data)
            })
        }
    }, [isLogin]);

    return (
        <div className="content">
            {userList?.map((user, idx) => (<div>{}</div>))}
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Simple Table</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>이름</th>
                                    <th>나이</th>
                                    <th>City</th>
                                    <th className="text-center">Salary</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userList?.map((user, idx) => (
                                    <tr key={idx}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td className="text-center">{user.regStatus}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default MemberList;
