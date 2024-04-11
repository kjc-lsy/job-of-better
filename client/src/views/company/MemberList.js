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
        <div className="content member-list">
            {userList?.map((user, idx) => (<div>{}</div>))}
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Simple Table</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table className="member-table" responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>이름</th>
                                    <th>아이디</th>
                                    <th>연락처</th>
                                    <th>성별</th>
                                    <th>자소서</th>
                                    <th>이력서</th>
                                    <th>면접</th>
                                    <th>가입</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userList?.map((user, idx) => (
                                    <tr key={user.name}>
                                        <td>{user.username}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.isCoverLetter}</td>
                                        <td>{user.resumeStatus}</td>
                                        <td>{user.name}</td>
                                        <td>{user.name}</td>
                                        <td>{user.name}</td>
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
