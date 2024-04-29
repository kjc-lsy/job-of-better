import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {useCurrProg} from "../../contexts/CurrProgProvider";
import {getCountApi} from "../../apis/company";
import {useLoading} from "../../contexts/LoadingProvider";
import ComHomeCard from "../../components/Card/ComHomeCard";
import PieChart from "../../components/Chart/PieChart";
import LineChart from "../../components/Chart/LineChart";
import InterviewCard from "../../components/Card/InterviewCard";

function Home() {

    const {loading, setLoading} = useLoading(false);
    const {currProg} = useCurrProg();

    const [userCount, setUserCount] = useState({
        totalCount: 0,
        interViewCount: 0,
        rejectedCount: 0,
        eduCount: 0,
    });
    const [coverLetterCount, setCoverLetterCount] = useState({
        clPendingCount: 0,
        clWritngCount: 0,
        clCompleteCount: 0
    });
    const [resumeCount, setResumeCount] = useState({
        resumePendingCount: 0,
        resumeWritingCount: 0,
        resumeCompleteCount: 0
    });

    const [regUserCount, setRegUserCount] = useState([{
        regCount: 0,
        regDate: new Date()
    }]);

    useEffect(() => {
        getCount()
    }, [])

    const getCount = async () => {
        setLoading(true);
        try {
            const res = await getCountApi(currProg);
            setUserCount({
                totalCount: res.data.user.totalCount,
                interViewCount: res.data.user.interViewCount,
                rejectedCount: res.data.user.rejectedCount,
                eduCount: res.data.user.eduCount
            });
            setCoverLetterCount({
                clPendingCount: res.data.coverLetter.clPendingCount,
                clWritngCount: res.data.coverLetter.clWritngCount,
                clCompleteCount: res.data.coverLetter.clCompleteCount
            })
            setResumeCount({
                resumePendingCount: res.data.resume.resumePendingCount,
                resumeWritingCount: res.data.resume.resumeWritingCount,
                resumeCompleteCount: res.data.resume.resumeCompleteCount
            })
            setRegUserCount(
            res.data.regUser.map((item, index) => {
                return {
                    regCount: item.count,
                    regDate: item.regDate
                }
            }
            ))
            //console.log(res.data.regUser);
        } catch (error) {
            if (error.response) {
                // 서버에서 응답은 받았지만 오류 상태 코드인 경우
                console.error("Server responded with an error:", error.response.data);
            } else if (error.request) {
                // 요청은 보냈지만 응답을 받지 못한 경우
                console.error("No response received:", error.request);
            } else {
                // 요청을 보내기 전에 오류가 발생한 경우
                console.error("Error setting up the request:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const cardData = [
        {
            cnt: userCount.totalCount,
            title: "총 신청자 수",
            subTitle: "프로그램 신청자 수"
        },
        {
            cnt: userCount.interViewCount,
            title: "면접자 수",
            subTitle: "최종면접 신청자 수"
        },
        {
            cnt: userCount.rejectedCount,
            title: "탈락자 수",
            subTitle: "전체 탈락자 수"
        },
        {
            cnt: userCount.eduCount,
            title: "교육자 수",
            subTitle: "현재 교육 진행자 수"
        }
    ]

    return (
        <div className="content">
            {loading ? null :
                <>
                    <Row className="home_top">
                        {cardData.map((data, idx) => (
                            <Col lg="3" key={idx}>
                                <ComHomeCard
                                    title={data.title}
                                    subTitle={data.subTitle}
                                    cnt={data.cnt}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row className="home_chart">
                        <Col lg="4">
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Cover Letter</h5>
                                    <CardTitle tag="h3">
                                        자기소개서
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <PieChart
                                            label="자기소개서"
                                            data={[coverLetterCount.clPendingCount, coverLetterCount.clWritngCount, coverLetterCount.clCompleteCount]}
                                        />
                                        {/*<Pie
                                            data={pieChart.data}
                                            data={
                                                {
                                                    labels: ["전체", "최종", "최종"],
                                                    datasets: [
                                                        {
                                                            data: [coverLetterCount.clPendingCount, coverLetterCount.clWritngCount, coverLetterCount.clCompleteCount]
                                                        }
                                                    ]
                                                }
                                            }
                                            options={pieChart.options}
                                            width="400px"
                                            height="200px"
                                        />*/}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4">
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Resume</h5>
                                    <CardTitle tag="h3">
                                        이력서
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <PieChart
                                            label="이력서"
                                            data={[resumeCount.resumePendingCount, resumeCount.resumeWritingCount, resumeCount.resumeCompleteCount]}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4">
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Daily application count</h5>
                                    <CardTitle tag="h3">
                                        일별 신청자 수
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        {/*<Line
                                            data={chartExample2.data}
                                            options={chartExample2.options}
                                        />*/}
                                        <LineChart
                                            canvasId="dayChart"
                                            data={regUserCount}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="home_time interview-manager">
                        <Col lg={12}>
                            <InterviewCard/>
                        </Col>
                    </Row>
                </>
            }
        </div>
    );
}

export default Home;
