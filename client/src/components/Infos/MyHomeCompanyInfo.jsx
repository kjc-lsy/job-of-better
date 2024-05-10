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
import {useAuth} from "../../contexts/AuthContextProvider";

export default function MyHomeCompanyInfo({user,setLoading, inputValue, setInputValue}) {
    const navigate = useNavigate();
    const location = window.location.pathname.split("/")[2];
    const imgRef = useRef();


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

    /*async function companyInfo() {
        try {
            const response = await userCompanyInfo();
            setInputValue({
                ...inputValue,
                ...response.data
            });
        }
        catch (error) {
            console.error(error.response);
        }
    }*/



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
                                     src={user.profileImg !== null ? user.profileImg : inputValue.gender === "F" ? femaleImg : maleImg}
                                />
                            </a>
                        </label>
                        <h5 className="title">{inputValue.name}</h5>
                        <p className="description">
                            {user.phone ? (user.phone).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : ""}</p>
                        <p className="description">
                            {user.birthDate} / {user.gender === 'F' ? "여성" : "남성"}</p>
                    </div>
                    <div className="card-description">
                        <p className="">
                            {inputValue.phone ? (inputValue.phone).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : ""}</p>
                        <p className="">
                            {inputValue.birthDate} / {inputValue.gender === 'F' ? "여성" : "남성"}</p>
                    </div>
                </CardBody>
            </Card>
            <Card className="card-user-box">
                <CardHeader>
                    <CardTitle tag="h4">프로그램 목록</CardTitle>
                </CardHeader>
                <CardBody>
                    <Table className="tablesorter">
                        <thead className="text-primary">
                        <tr>
                            <th className="text-center" width={130}>제목</th>
                            <th className="text-center">상태</th>
                            <th className="text-center" width={100}>날짜</th>
                            <th className="text-center">바로가기</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{clValue.mclTitle ?
                            <tr>
                                <td><div className="ellipsis">{clValue.mclTitle}</div></td>
                                <td className="text-center">
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
                        }*/}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </>
    )
}