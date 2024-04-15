import React, {useEffect, useState} from "react";

// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {Form, InputGroup, Pagination, SelectPicker} from "rsuite";
import {getMembersPage, updateRegStatus} from "../../apis/company";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

function MemberList() {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [userList, setUserList] = useState(null)
    const [keyword, setKeyword] = useState('')
    const [programSort, setProgramSort] = useState('')
    const regStatusSelect = [{label: '가입대기', value: 'Pending'}, {label: '확인', value: 'Approved'}, {label: '거절', value: 'Rejected'}]

    useEffect(() => {
        updatePage()
    }, [page]);

    const renderMenuItem = (label, item) => item.value === 'Pending' ?
        <span style={{color: '#e55757'}}>{label}</span> : label;
    const renderValue = (value, item, selectedEl) => {
        if (value === 'Pending') return (<span style={{color: '#e55757'}}>{item.label}</span>)
        return selectedEl
    }

    const updatePage = () => {
        getMembersPage(page-1, pageSize, keyword).then(res => {
            setUserList(res.data.content)
            setTotalPage(res.data.totalElements)
        })
    }

    return (
        <div className="content member-list">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">학생 정보</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="table-header">
                                <Form onSubmit={(checkStatus, event) => {
                                    event.preventDefault()
                                    updatePage()
                                }}>
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="이름"
                                            value={keyword}
                                            onChange={setKeyword}
                                        />
                                        <InputGroup.Addon>
                                            <FontAwesomeIcon onClick={updatePage} icon={faMagnifyingGlass}/>
                                        </InputGroup.Addon>
                                    </InputGroup>
                                </Form>
                            </div>
                            <Table className="member-table" responsive>
                                <thead className="text-primary">
                                <tr className="text-center">
                                    <th>아이디</th>
                                    <th>이름</th>
                                    <th>연락처</th>
                                    <th>성별</th>
                                    <th>자소서</th>
                                    <th>이력서</th>
                                    <th>면접</th>
                                    <th>프로그램</th>
                                    <th>신청 상태</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userList?.map(({member, pgTitle}, idx) => (
                                        <tr key={member.username} className="text-center">
                                            <td>
                                                <a onClick={(e) => {
                                                    e.preventDefault()
                                                    navigate(`/company/user-profile/${member.idx}`)
                                                }}>
                                                    {member.username}
                                                </a>
                                            </td>
                                            <td>{member.name}</td>
                                            <td>{member.phone}</td>
                                            <td>{member.gender === 'M' ? '남' : '여'}</td>
                                            <td>{member.coverLetterStatus ?? '미작성'}</td>
                                            <td>{member.resumeStatus ?? '미작성'}</td>
                                            <td>{member.interviewStatus ?? '미신청'}</td>
                                            <td>{pgTitle}</td>
                                            <td>
                                                <SelectPicker
                                                    cleanable={false}
                                                    renderMenuItem={renderMenuItem}
                                                    renderValue={renderValue}
                                                    onChange={(value) => updateRegStatus(member.idx, value)}
                                                    data={regStatusSelect}
                                                    searchable={false}
                                                    style={{width: 120}}
                                                    defaultValue={member.pgRegStatus}
                                                />
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </Table>
                            <div className="pagination-wrapper">
                                <span className="total-student-cnt">총 학생 수 : {totalPage}</span>
                                <Pagination
                                    layout={['-', 'pager', '-']}
                                    prev
                                    last
                                    next
                                    first
                                    size="sm"
                                    total={totalPage}
                                    limit={pageSize}
                                    activePage={page}
                                    onChangePage={setPage}
                                    maxButtons={10}
                                />

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default MemberList;
