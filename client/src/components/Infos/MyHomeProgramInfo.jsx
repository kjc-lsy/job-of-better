import React, {useEffect} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Form, Table} from "reactstrap";
import ProgCurrentStatus from "./ProgCurrentStatus";
import KorDatePicker from "../KorDatePicker";
import {allowedRange} from "rsuite/cjs/DateRangePicker/disabledDateUtils";
import {InputPicker} from "rsuite";
import {Viewer} from "@toast-ui/react-editor";
import {useLocation, useNavigate} from "react-router-dom";
import * as user from '../../apis/user';
import {getCurrentOccupancy} from '../../apis/user';
import {useAlert} from "../Alert/useAlert";
import {useNotification} from "../Notification/useNotification";

export default function MyHomeProgramInfo({inputValue, setInputValue}) {
    const navigate = useNavigate();
    const sendAlert = useAlert();
    const sendNoti = useNotification();
    const location = useLocation().pathname.split('/').pop();
    const [interviewTimeLabel, setInterviewTimeLabel] = React.useState([]);
    const [interviewDisableTimeLabel, setInterviewDisableTimeLabel] = React.useState([]);
    const [interviewTimeLabelNode, setInterviewTimeLabelNode] = React.useState([]);
    const [pgValue, setPgValue] = React.useState({
        pgId: 0,
        pgComName: "",
        pgComTel: "",
        pgComAddr: "",

        pgTitle: "",
        pgContent: "",
        pgProgStartDate: "", //프로그램시작
        pgProgEndDate: "",
        pgEduStartDate: "", // 교육시작일
        pgEduEndDate: "",
        pgRegValStartDate: "", //등록가능날짜
        pgRegValEndDate: "",
        pgStatus: "",
        pgInterviewValStartDate: "", //인터뷰 시작
        pgInterviewValEndDate: "",
        pgInterviewValStartTime: "",
        pgInterviewValEndTime: "",
    });

    useEffect(() => {
        pgInfo()
            .catch((error) => {
                console.error(error.response.data);
            });
        console.log(location);
    }, [])

    useEffect(() => {
        const timeLabel = generateTimeLabel(convertTimeToMinutes(pgValue.pgInterviewValStartTime), convertTimeToMinutes(pgValue.pgInterviewValEndTime), parseInt(pgValue.pgInterviewUnitTime));
        setInterviewTimeLabel(timeLabel)
    }, [pgValue.pgInterviewValStartTime, pgValue.pgInterviewValEndTime, pgValue.pgInterviewUnitTime]);

    useEffect(() => {
        if (inputValue.registeredInterviewDate) {
            setInterviewDisableTimeLabel([])

            const newNodes = interviewTimeLabel.map(value => {
                const searchedDatetime = new Date(inputValue.registeredInterviewDate.getTime());
                searchedDatetime.setHours(parseInt(value.label.split(":")[0], 10));
                searchedDatetime.setMinutes(parseInt(value.label.split(":")[1], 10));

                return getCurrentOccupancy(searchedDatetime).then(res => {
                    if (res.data === pgValue.pgMaxIntervieweesPerUnit) {
                        setInterviewDisableTimeLabel(prevLabels => [...prevLabels, value.label]);
                    }
                    return {
                        ...value,
                        node: (
                            <div>{value.label} ({res.data ? res.data : 0}/{pgValue.pgMaxIntervieweesPerUnit})</div>)
                    };
                });
            });

            Promise.all(newNodes).then(results => {
                setInterviewTimeLabelNode(results);
            });
        }
    }, [inputValue.registeredInterviewDate, interviewTimeLabel, inputValue.registeredInterviewTime]);

    useEffect(() => {
        const registeredInterviewDatetime = new Date(inputValue.registeredInterviewDate?.getTime());
        if (inputValue.registeredInterviewTime) {
            registeredInterviewDatetime?.setHours(inputValue?.registeredInterviewTime?.split(':')[0])
            registeredInterviewDatetime?.setMinutes(inputValue?.registeredInterviewTime?.split(':')[1])
        }
        setInputValue({...inputValue, registeredInterviewDatetime: registeredInterviewDatetime})

    }, [inputValue.registeredInterviewTime, inputValue.registeredInterviewDate]);

    // 프로그램 정보 불러오기
    const pgInfo = async () => {
        try {
            const response = await user.pgInfo();
            // 프로그램 정보 업데이트
            setPgValue((prev) => ({
                ...prev,

                pgComName: response.data.company.comName,
                pgComTel: response.data.company.comTel,
                pgComAddr: response.data.company.comAddress,

                pgId: response.data.program.pgIdx,
                pgTitle: response.data.program.pgTitle,
                pgStatus: response.data.program,
                pgProgStartDate: response.data.program.pgProgStartDate,
                pgProgEndDate: response.data.program.pgProgEndDate,
                pgEduStartDate: response.data.program.pgEduStartDate,
                pgEduEndDate: response.data.program.pgEduEndDate,
                pgRegValStartDate: response.data.program.pgRegValStartDate,
                pgRegValEndDate: response.data.program.pgRegValEndDate,
                pgInterviewValStartDate: response.data.program.pgInterviewValStartDate,
                pgInterviewValEndDate: response.data.program.pgInterviewValEndDate,
                pgInterviewValEndTime: response.data.program.pgInterviewValEndTime,
                pgInterviewValStartTime: response.data.program.pgInterviewValStartTime,
                pgContent: (response.data.program.pgContentSummary).replace(/<[^>]+>/g, ''),
                pgInterviewUnitTime: response.data.program.pgInterviewUnitTime,
                pgMaxIntervieweesPerUnit: response.data.program.pgMaxIntervieweesPerUnit
            }));
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const viewMore = () => {
        let viewer = document.getElementById("mypg_viewer");
        viewer.classList.toggle("on");
        setTimeout(() => {
            if (viewer.classList.contains("on")) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }, 0);
    };

    const convertTimeToMinutes = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        return hour * 60 + minute;
    };

    const generateTimeLabel = (start, end, interval) => {
        const timeList = [];

        for (let time = start; time <= end; time += interval) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            timeList.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
        }

        return timeList.map(time => ({label: time, value: time}));
    };

    const handleBtnClick = (e) => {
        e.preventDefault()
        user.registerInterview(inputValue.registeredInterviewDatetime)
            .then(() => {
                sendNoti("success", "신청이 완료되었습니다. \n기업 관리자의 확정 이후에는 수정이 불가능합니다.");

                setInputValue(prev => ({
                    ...prev,
                    registeredInterviewDate: new Date(inputValue.registeredInterviewDate)
                }));
            })
            .catch((error) => {
                sendAlert("error", error.response.data);
            });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">프로그램</CardTitle>
                <p className="category">신청한 프로그램 정보입니다. 면접시간 등 확인해주세요.</p>
            </CardHeader>
            <CardBody>
                <Table className="tablesorter">
                    <thead className="text-primary">
                    <tr>
                        <th>프로그램명</th>
                        <th className="text-center">기관명</th>
                        <th className="text-center">전화번호</th>
                        <th className="text-center">지역</th>
                        <th className="text-center">상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b className="title"
                               onClick={e => navigate(`/user/program-details/${pgValue.pgId}`)}>{pgValue.pgTitle}</b>
                        </td>
                        <td className="text-center">{pgValue.pgComName}</td>
                        <td className="text-center">{pgValue.pgComTel ? pgValue.pgComTel : "없음"}</td>
                        <td className="text-center">{(pgValue.pgComAddr)?.split(" ").slice(0, 2).join(" ")}</td>
                        <td className="text-center">
                                        <span
                                            className={inputValue.pgRegStatus === "Approved" ? "confirm" : inputValue.pgRegStatus === "Rejected" ? "reject" : "delay"}>
                                            {inputValue.pgRegStatus === "Approved" ? "확정" : inputValue.pgRegStatus === "Rejected" ? "거절" : "보류"}
                                        </span>
                        </td>
                    </tr>

                    </tbody>
                </Table>
            </CardBody>
            <CardFooter>
                <div className="programInfo">
                    <div>
                        <span>프로그램 진행 기한</span>
                        <p>{pgValue.pgProgStartDate} ~ {pgValue.pgProgEndDate}</p>
                    </div>
                    <div>
                        <span>프로그램 진행 상황</span>
                        <ProgCurrentStatus program={pgValue.pgStatus}/>
                    </div>
                    <Form role="form">
                        <div>
                            <span>면접 시간</span>
                            {inputValue.interviewStatus === "Approved"
                                ?
                                <p>{new Date(inputValue.registeredInterviewDate).toLocaleString()}</p>
                                : <p>
                                    <KorDatePicker
                                        value={inputValue.registeredInterviewDate}
                                        name="interviewDate"
                                        format="yyyy-MM-dd"
                                        shouldDisableDate={(allowedRange(Math.max(new Date(pgValue.pgInterviewValStartDate), new Date()), pgValue.pgInterviewValEndDate))}
                                        onChange={value => {
                                            setInputValue({...inputValue, registeredInterviewDate: value});
                                        }}
                                    />
                                    <InputPicker
                                        key={inputValue.registeredInterviewTime + interviewDisableTimeLabel}
                                        style={{width: '100px'}}
                                        value={inputValue.registeredInterviewTime}
                                        onChange={value => {
                                            setInputValue({...inputValue, registeredInterviewTime: value});
                                        }}
                                        data={interviewTimeLabel}
                                        renderMenuItem={(label, item) => {
                                            const node = interviewTimeLabelNode.find(node => node.label === label);
                                            return node ? node.node : <div>{label}</div>;
                                        }}
                                        disabledItemValues={interviewDisableTimeLabel}
                                    />
                                    <Button type="button" onClick={handleBtnClick}
                                            disabled={!inputValue.registeredInterviewTime}>
                                        신청
                                    </Button>
                                </p>
                            }
                        </div>
                    </Form>
                    <div>
                        <span>내용</span>
                        <Viewer
                            key={pgValue.pgContent}
                            initialValue={pgValue.pgContent}
                        />
                        {/*<Button type="button" onClick={viewMore} className="btn02 viewMore">더
                                        보기</Button>*/}
                    </div>
                    <div>
                        <span>상태</span>
                        <p>
                                        <span
                                            className={inputValue.pgRegStatus === "Approved" ? "confirm" : inputValue.pgRegStatus === "Rejected" ? "reject" : "delay"}>
                                            {inputValue.pgRegStatus === "Approved" ? "확정" : inputValue.pgRegStatus === "Rejected" ? "거절" : "보류"}
                                        </span>
                        </p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}