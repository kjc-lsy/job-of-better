import React, {useEffect, useRef, useState} from "react";
import * as user from "../../apis/user";
import {coverLetterInfo, uploadFileToAWS, userProfileInfo} from "../../apis/user";
import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Row, Table} from "reactstrap";
import femaleImg from "../../assets/img/userImg_female.png";
import maleImg from "../../assets/img/userImg_male.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import ResumeCard from "../Card/ResumeCard";

export default function MyHomeUserInfo({setInfoLoading, setLoading, inputValue, setInputValue, setModifiedValue , modifiedValue}) {
    const navigate = useNavigate();
    const location = window.location.pathname.split("/")[2];
    const imgRef = useRef();

    let [clValue, setClValue] = useState({
        mclTitle: "",
        mclDate: "",
        mclIsConfirm: "",
        coverLetterPercent : 0,
    });

    useEffect(() => {
        Promise.all([userInfo(), userCoverLetterInfo()])
            .then(([userInfoData, userCoverLetterData]) => {
                // Handle the resolved data
            })
            .catch((error) => {
                console.error(error.response ? error.response.data : error.message);
            });
    }, []);

    const changeProfileImg = () => {
        document.getElementById("profile-img").click();
    };

    // 파일 변경 핸들러
    const handleImgFileChange = async (e) => {
        setLoading(true);
        console.log(e.target.files);
        try {
            const response = await uploadFileToAWS(e.target.files, 'profile');
            setInputValue({
                ...inputValue,
                profileImg: response.data
            });
        } catch (error) {
            console.error(error.response);
        } finally {
            setLoading(false);
        }
    };

    // 사용자 정보 불러오기
    const userInfo = async () => {
        setInfoLoading(false);
        try {
            const response = await userProfileInfo();

            // time 파싱하기...
            const registeredInterviewDate = response.data.registeredInterviewDate;
            const hour = registeredInterviewDate?.split('T')[1]?.split(':')[0];
            const minute = registeredInterviewDate?.split('T')[1]?.split(':')[1];

            // console.log(response.data);
            // 사용자 정보 업데이트
            setInputValue((prevInputValue) => ({
                ...prevInputValue,
                name: response.data.name,
                username: response.data.username,
                profileImg: response.data.profileImg,
                gender: response.data.gender,
                phone: response.data.phone,
                birthDate: response.data.birthDate,
                address: response.data.address,
                zipCode: response.data.zipCode,
                detailAddr: response.data.detailAddr,
                resumeStatus : response.data.resumeStatus,

                email: response.data.email,
                pgRegStatus: response.data.pgRegStatus,
                emailUserName: (response.data.email).split("@")[0],
                domain: (response.data.email).split("@")[1],
                registeredInterviewDatetime: response.data.registeredInterviewDate ? new Date(response.data.registeredInterviewDate) : null,
                registeredInterviewDate: response.data.registeredInterviewDate ? new Date(response.data.registeredInterviewDate) : new Date(),
                registeredInterviewTime: response.data.registeredInterviewDate ? `${hour}:${minute}` : null,
                interviewStatus: response.data.interviewStatus
            }));

            setModifiedValue((prev) => ({
                ...prev,
                username : response.data.username,
                name : response.data.name,
                birthDate: response.data.birthDate,
                phone : response.data.phone,
                email: response.data.email,
                emailUserName: (response.data.email).split("@")[0],
                domain: (response.data.email).split("@")[1],
                zipCode: response.data.zipCode,
                address : response.data.address,
                detailAddr : response.data.detailAddr
            }));
        } catch (error) {
            console.error(error.response.data);
        } finally {
            setInfoLoading(true);
        }
    };

    //coverletter 값 들고오기
    const userCoverLetterInfo = async () => {
        try {
            const response = await user.coverLetterInfo();
            if(!response.data) return;
            //console.log(response.data);
            /*setInputValue((inputValue) =>({
                ...inputValue,
                coverLetterLength: response.data.memberCoverLetter?.length,
                coverLetterTotalLength: response.data.comCoverLetter?.length,
                coverLetterPercent: (((response.data.memberCoverLetter?.length ? response.data.memberCoverLetter?.length : 0) / (response.data.comCoverLetter?.length) ? response.data.comCoverLetter?.length : 0) * 100).toFixed(0),
            }));*/
            const mcl_leng = response.data.reduce((count, item) => (item.memberCoverLetter ? count + 1 : count), 0);
            const ccl_leng = response.data.length;
            //console.log("mcl_leng : " + mcl_leng + " / ccl_leng : " + ccl_leng);
            setClValue({
                mclTitle: response.data[0].memberCoverLetter?.mclTitle,
                mclDate: response.data[0].memberCoverLetter?.mclModifiedDate,
                mclIsConfirm: response.data[0].memberCoverLetter?.mclIsConfirm,
                coverLetterPercent: (mcl_leng / ccl_leng * 100).toFixed(0),
            });

        } catch (error) {
            console.error(error.response.data);
        }
    }


    return (
        <>
            <Card className="card-user">
                <CardBody>
                    <CardText/>
                    <div className="author">
                        <div className="block block-one"/>
                        <div className="block block-two"/>
                        <div className="block block-three"/>
                        <div className="block block-four"/>
                        <input type="file" id="profile-img" accept="image/*"
                               onChange={handleImgFileChange}/>
                        <label htmlFor="profile-img" className="profile_img">
                            <a href="#pablo" onClick={(e) => {
                                e.preventDefault();
                                changeProfileImg(e); // changeProfileImg 함수 호출 시 이벤트 객체 전달
                            }}>
                                <img alt="profile image"
                                     ref={imgRef}
                                     name="profileImg"
                                     className="avatar"
                                     src={inputValue.profileImg !== null ? inputValue.profileImg : inputValue.gender === "F" ? femaleImg : maleImg}
                                />
                            </a>
                        </label>
                        <h5 className="title">{inputValue.name}</h5>
                        <p className="description">
                            {inputValue.phone ? (inputValue.phone).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : ""}</p>
                        <p className="description">
                            {inputValue.birthDate} / {inputValue.gender === 'F' ? "여성" : "남성"}</p>
                    </div>
                    {/*<div className="card-description">
                        <p className="">
                            {inputValue.phone ? (inputValue.phone).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : ""}</p>
                        <p className="">
                            {inputValue.birthDate} / {inputValue.gender === 'F' ? "여성" : "남성"}</p>
                    </div>*/}
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col md={4}>
                            <b>이력서</b>
                            <div className={"percent percent" + (inputValue.resumeStatus === "Complete" ? 360 : 0)}>
                                <span>{inputValue.resumeStatus === "Complete" ? "100" : "0"}%</span>
                            </div>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate("/user/resume")
                            }}>
                                바로가기
                            </a>
                        </Col>
                        <Col md={4}>
                            <b>자기소개서</b>
                            <div className={"percent percent" + clValue.coverLetterPercent * 3.6}>
                                <span>{clValue.coverLetterPercent}%</span>
                            </div>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate("/user/cover-letter")
                            }}>
                                바로가기
                            </a>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
            {location !== "user-modify" ?
                <>
            <ResumeCard/>
            <Card className="card-user-box">
                <CardHeader>
                    <CardTitle tag="h4">자기소개서</CardTitle>
                </CardHeader>
                <CardBody>
                    <Table className="tablesorter">
                        <thead className="text-primary">
                        <tr>
                            <th className="text-center" width={130}>제목</th>
                            <th className="text-center">작업 상태</th>
                            <th className="text-center" width={100}>날짜</th>
                            <th className="text-center">바로가기</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clValue.mclTitle ?
                            <tr>
                                <td><div className="ellipsis">{clValue.mclTitle}</div></td>
                                <td className="text-center">
                                    {clValue.mclIsConfirm === "T" ? "임시저장" :
                                        clValue.mclIsConfirm === "Y" ? "완료" : "미작성"}
                                </td>
                                <td className="text-center">{clValue.mclDate ? clValue.mclDate?.split("T")[0] : null}</td>
                                <td className="text-center">
                                    <a onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/user/cover-letter")
                                    }}>
                                        <FontAwesomeIcon size={"lg"} icon={faArrowCircleRight}/>
                                    </a>
                                </td>
                            </tr>
                            :
                            <tr>
                                <td colSpan={5} className="text-center">자료가 없습니다.</td>
                            </tr>
                        }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
                </>
                : null }
        </>
    )
}