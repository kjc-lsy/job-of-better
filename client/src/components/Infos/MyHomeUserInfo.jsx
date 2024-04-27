import React, {useEffect, useRef, useState} from "react";
import * as user from "../../apis/user";
import {coverLetterInfo, deleteResumeFile, getFilesByPath, uploadFileToAWS, userProfileInfo} from "../../apis/user";
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Row, Table} from "reactstrap";
import femaleImg from "../../assets/img/userImg_female.png";
import maleImg from "../../assets/img/userImg_male.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import BtnModal from "../Modal/BtnModal";
import PdfViewer from "../Viewer/PdfViewer";
import {format} from "date-fns";
import {Loader} from "rsuite";
import HwpViewer from "../Viewer/HwpViewer";
import ImagesViewer from "../Viewer/ImagesViewer";
import InfoPopUp from "../PopUp/InfoPopUp";
import {ReactComponent as UploadIcon} from '../../assets/img/upload.svg';

export default function MyHomeUserInfo({setInfoLoading, setLoading, inputValue, setInputValue}) {
    const navigate = useNavigate();
    const imgRef = useRef();
    const [resumeFiles, setResumeFiles] = useState([])
    const [resumeDeleteLoadings, setResumeDeleteLoadings] = useState({})

    useEffect(() => {
        Promise.all([userInfo(), coverLetterInfo()])
            .catch((error) => {
                console.error(error.response.data);
            });
    }, []);

    useEffect(() => {
        getFilesByPath('resume').then(res => {
            setResumeFiles(res.data)
        })
    }, []);

    const changeProfileImg = () => {
        document.getElementById("profile-img").click();
    };

    // 파일 변경 핸들러
    const handleImgFileChange = async (e) => {
        setLoading(true);
        const file = e.target.files[0];

        try {
            const response = await uploadFileToAWS(file, 'profile');
            setInputValue({
                ...inputValue,
                profileImg: response.data
            });
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const handleResumeFileChange = async (e) => {
        const files = e.target.files;

        setLoading(true)

        try {
            await uploadFileToAWS(files, 'resume')
        } catch (e) {
            console.error(e.response.data);
        } finally {
            setLoading(false)
        }

    };
    useEffect(() => {
        Promise.all([userInfo(), userCoverLetterInfo()])
            .catch((error) => {
                console.error(error.response.data);
            });
    }, []);

    /*useEffect(() => {
        console.log(inputValue)
    }, [inputValue]);*/

    // 사용자 정보 불러오기
    const userInfo = async () => {
        setInfoLoading(false);
        try {
            const response = await userProfileInfo();

            // time 파싱하기...
            const registeredInterviewDate = response.data.registeredInterviewDate;
            const hour = registeredInterviewDate?.split('T')[1]?.split(':')[0];
            const minute = registeredInterviewDate?.split('T')[1]?.split(':')[1];

            //console.log(response.data);
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

                email: response.data.email,
                pgRegStatus: response.data.pgRegStatus,
                emailUserName: (response.data.email).split("@")[0],
                domain: (response.data.email).split("@")[1],
                registeredInterviewDatetime: response.data.registeredInterviewDate ? new Date(response.data.registeredInterviewDate) : null,
                registeredInterviewDate: response.data.registeredInterviewDate ? new Date(response.data.registeredInterviewDate) : new Date(),
                registeredInterviewTime: response.data.registeredInterviewDate ? `${hour}:${minute}` : null,
                interviewStatus: response.data.interviewStatus
            }));
        } catch (error) {
            console.error(error.response.data);
        } finally {
            setInfoLoading(true);
        }
    };

    const selectViewerComponent = (file) => {
        const fileType = file.uploadFileExt

        switch (fileType.toLowerCase()) {
            case 'pdf':
                return <PdfViewer fileUrl={file.uploadFileUrl}/>;
            case 'hwp':
                return <HwpViewer fileUrl={file.uploadFileUrl}/>;
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'png':
                return <ImagesViewer fileUrl={file.uploadFileUrl}/>;
            default:
                return (<div>읽을 수 없는 파일입니다.</div>);
        }
    };


    //coverletter 값 들고오기
    const userCoverLetterInfo = async () => {
        try {
            const response = await user.coverLetterInfo();
            setInputValue((prevInputValue) => ({
                ...prevInputValue,
                mclTitle: response.data.memCoverLetter?.mclTitle,
                mclDate: response.data.memCoverLetter?.mclModifiedDate,
                mclIsConfirm: response.data.memCoverLetter?.mclIsConfirm,
                coverLetterPercent: (((response.data.memCoverLetter?.length ? response.data.memCoverLetter?.length : 0) / (response.data.comCoverLetter?.length) ? response.data.comCoverLetter?.length : 0) * 100).toFixed(0),
            }))
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
                        <p className="description">인하대 졸업</p>
                    </div>
                    {/*<div className="card-description">
                                Do not be scared of the truth because we need to restart the
                                human foundation in truth And I love you like Kanye loves
                                Kanye I love Rick Owens’ bed design but the back is...
                            </div>*/}
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col md={4}>
                            <b>이력서</b>
                            <div className="percent percent288">
                                <span>80%</span>
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
                            <div className={"percent percent" + inputValue.coverLetterPercent * 3.6}>
                                <span>{inputValue.coverLetterPercent}%</span>
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
            <Card className="card-user-box">
                <CardHeader>
                    <div>
                        <CardTitle tag="h4" style={{display: "inline-block"}}>이력서</CardTitle>
                        <InfoPopUp>pdf, hwp, jpg, png 형식을 지원합니다.</InfoPopUp>
                    </div>
                    <div>
                        <input type="file" accept="application/pdf, image/*, .hwp"
                               id="resume-upload"
                               onChange={handleResumeFileChange}
                               style={{display: "none"}}
                               multiple
                        />
                        <label htmlFor="resume-upload" className="justify-content-center align-items-center btn" style={{color: "white"}}>
                                <UploadIcon width={16} height={16} fill={"#fff"}/>업로드
                        </label>
                    </div>
                </CardHeader>
                <CardBody>
                    <Table className="tablesorter">
                        <thead className="text-primary">
                        <tr>
                            <th className="text-center">파일명</th>
                            <th className="text-center">등록일</th>
                            <th className="text-center">이력서 보기</th>
                            <th className="text-center">삭제하기</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resumeFiles.map((file, index) => (
                            <tr key={file.fileIdx}>
                                <td className="text-center">
                                    {file.originalFileName}
                                </td>
                                <td className="text-center">
                                    {format(file.uploadFileDate, 'yyyy-MM-dd')}
                                </td>
                                <td className="text-center">
                                    <BtnModal buttonName={"보기"} component={selectViewerComponent(file)}/>
                                </td>
                                <td className="text-center">
                                    <Button
                                        onClick={async () => {
                                            setResumeDeleteLoadings(prev => ({...prev, [file.fileIdx]: true}));
                                            await deleteResumeFile(file.fileIdx);
                                            setResumeFiles(prev => prev.filter(f => f.fileIdx !== file.fileIdx));
                                            setResumeDeleteLoadings(prev => ({...prev, [file.fileIdx]: false}));
                                        }}>
                                        {resumeDeleteLoadings[file.fileIdx] ? <Loader size="sm"/> : "삭제"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Card className="card-user-box">
                <CardHeader>
                    <CardTitle tag="h4">자기소개서</CardTitle>
                </CardHeader>
                <CardBody>
                    <Table className="tablesorter">
                        <thead className="text-primary">
                        <tr>
                            <th>제목</th>
                            <th className="text-center">작업 상태</th>
                            <th className="text-center">날짜</th>
                            <th className="text-center">바로가기</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inputValue.mclTitle ?
                            <tr>
                                <td>{inputValue.mclTitle}</td>
                                <td className="text-center">
                                    {inputValue.mclIsConfirm === "tmp" ? "임시저장" :
                                        inputValue.mclIsConfirm === "done" ? "완료" : "미작성"}
                                </td>
                                <td className="text-center">{inputValue.mclDate ? new Date(inputValue.mclDate)?.split("T")[0] : null}</td>
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
    )
}