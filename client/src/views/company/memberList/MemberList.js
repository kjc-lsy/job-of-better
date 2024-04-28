import React, {useEffect, useState} from "react";

// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {Form, InputGroup, Loader, Pagination, SelectPicker, Toggle} from "rsuite";
import {getMembersPage, updateRegStatus} from "../../../apis/company";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useCurrProg} from "../../../contexts/CurrProgProvider";
import RegStatusPicker from "../../../components/SelectPicker/RegStatusPicker";
import ResumeModal from "../../../components/Modal/ResumeModal";

function MemberList() {
    const navigate = useNavigate()
    const [userList, setUserList] = useState(null)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [keyword, setKeyword] = useState()
    const {currProg, setCurrProg} = useCurrProg()
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useSearchParams()
    const [activeResumeModalIdx, setActiveResumeModalIdx] = useState(null)

    const coverLetterSelect = [{label: '미작성', value: 'Pending'}, {label: '작성중', value: 'Writing'}, {
        label: '작성완료',
        value: 'Complete'
    }]
    const resumeSelect = [{label: '미작성', value: 'Pending'}, {label: '작성중', value: 'Writing'}, {
        label: '제출완료',
        value: 'Complete'
    }]
    const interviewSelect = [{label: '미신청', value: 'Pending'}, {label: '면접대기', value: 'Registered'}, {
        label: '합격',
        value: 'Approved'
    }, {label: '불합격', value: 'Rejected'}]

    const [coverLetterFilter, setCoverLetterFilter] = useState(null)
    const [resumeFilter, setResumeFilter] = useState(null)
    const [interviewFilter, setInterviewFilter] = useState(null)
    const [regStatusFilter, setRegStatusFilter] = useState(null)

    useEffect(() => {
        if(params.get("regStatus")) setRegStatusFilter(params.get("regStatus"))
        if(params.get("pgIdx")) setCurrProg(parseInt(params.get("pgIdx"),10));
    }, []);

    useEffect(() => {
        const abortController = updatePage();

        return () => {
            abortController.abort()
        }
    }, [page, currProg, coverLetterFilter, resumeFilter, interviewFilter, regStatusFilter]);

    const updatePage = () => {
        const abortController = new AbortController();
        setLoading(true);

        getMembersPage(page - 1, pageSize, keyword, currProg, coverLetterFilter, resumeFilter, interviewFilter, regStatusFilter, abortController.signal)
            .then(res => {
                setUserList(res.data.content)
                setTotalPage(res.data.totalElements)
                setLoading(false)
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    console.error('요청 중 요청 재시도... :', error)
                }
            })

        return abortController;
    }

    const renderMenuItem = (label, item) => {
        if(item.value == 'Registered') return <span style={{color: '#e55757'}}>{label}</span>

        if(item.value == 'Rejected') return <span style={{color: '#000000'}}>{label}</span>

        return label
    }

    const renderValue = (value, item, selectedEl) => {
        if (value === 'Registered') return (<span style={{color: '#e55757'}}>{item.label}</span>)

        if (value === 'Rejected') return (<span style={{color: '#000000'}}>{item.label}</span>)

        return selectedEl
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
                                <Form onSubmit={(status, e)=> {
                                    e.preventDefault()
                                    updatePage()
                                } }>
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="이름 검색"
                                            value={keyword}
                                            onChange={setKeyword}
                                            name={"keyword"}
                                        />
                                        <InputGroup.Addon onClick={updatePage}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                        </InputGroup.Addon>
                                    </InputGroup>
                                </Form>
                                <div className="select-all-members">
                                    <span>모든 프로그램 보기</span>
                                    <Toggle onChange={(value)=> {
                                        if(!value) {
                                           setCurrProg(localStorage.getItem("program"))
                                        }
                                        if(value) {
                                            setCurrProg("")
                                        }
                                    }}/>
                                </div>
                                {/*<Button onClick={()=> setCurrProg("")}>모든 프로그램 보기</Button>*/}

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
                                    <th>면접 상태</th>
                                    <th>프로그램</th>
                                    <th>신청 상태</th>
                                </tr>
                                <tr className="text-center">
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>
                                        <SelectPicker
                                            key={coverLetterFilter}
                                            defaultValue={coverLetterFilter}
                                            onChange={setCoverLetterFilter}
                                            searchable={false}
                                            style={{width: 80}}
                                            data={coverLetterSelect}
                                            placeholder={"filter"}
                                            size="xs"
                                        />
                                    </th>
                                    <th>
                                        <SelectPicker
                                            key={resumeSelect}
                                            defaultValue={resumeFilter}
                                            onChange={setResumeFilter}
                                            searchable={false}
                                            style={{width: 80}}
                                            data={resumeSelect}
                                            placeholder={"filter"}
                                            size="xs"
                                        />
                                    </th>
                                    <th>
                                        <SelectPicker
                                            key={interviewFilter}
                                            defaultValue={interviewFilter}
                                            onChange={setInterviewFilter}
                                            searchable={false}
                                            style={{width: 80}}
                                            data={interviewSelect}
                                            placeholder={"filter"}
                                            size="xs"
                                        />
                                    </th>
                                    <th></th>
                                    <th>
                                        <RegStatusPicker
                                            key={regStatusFilter}
                                            defaultValue={regStatusFilter}
                                            onChange={setRegStatusFilter}
                                            style={{width: 100}}
                                            placeholder={"filter"}
                                            size="xs"
                                        />
                                    </th>
                                </tr>
                                </thead>
                                {loading
                                    ?
                                    <tbody>
                                    <tr className="mem-list-loader"><td><Loader backdrop center content="loading"/></td></tr>
                                    </tbody>
                                    :
                                    <tbody>
                                    {userList?.map(({member, pgTitle}) => (
                                            <tr key={member.username} className="text-center">
                                                <td>
                                                    <a onClick={(e) => {
                                                        e.preventDefault()
                                                        navigate(`/company/user-details/${member.idx}`)
                                                    }}>
                                                        {member.username}
                                                    </a>
                                                </td>
                                                <td>{member.name}</td>
                                                <td>{member.phone}</td>
                                                <td>{member.gender === 'M' ? '남' : '여'}</td>
                                                <td>{member.coverLetterStatus === 'Pending' ? "미작성" : member.coverLetterStatus === 'Writing' ? "작성중" : "작성 완료"}</td>
                                                <td>
                                                        {member.resumeStatus === 'Pending'
                                                            ?
                                                            "미작성"
                                                            :
                                                            <a onClick={(e)=>{
                                                                e.preventDefault()
                                                                setActiveResumeModalIdx(member.idx)
                                                            }}>
                                                            작성 완료
                                                            </a>
                                                        }
                                                </td>
                                                <td>{member.interviewStatus === 'Pending' ? '미신청' : member.interviewStatus === 'Registered' ? "면접 대기" : member.interviewStatus === "Approved" ? "합격" : "불합격"}</td>
                                                <td>
                                                    <a onClick={(e)=>{
                                                    e.preventDefault()
                                                    navigate(`/company/program-details/${member.pgIdx}`)
                                                }}>{pgTitle}</a>
                                                </td>
                                                <td>
                                                    <RegStatusPicker
                                                        cleanable={false}
                                                        onChange={(value) => updateRegStatus(member.idx, value)}
                                                        style={{width: "100px"}}
                                                        defaultValue={member.pgRegStatus}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    )}
                                    </tbody>
                                }
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
            <ResumeModal isOpen={activeResumeModalIdx !== null} setIsOpen={() => setActiveResumeModalIdx(null)} memIdx={activeResumeModalIdx}/>
        </div>
    );
}

export default MemberList;
