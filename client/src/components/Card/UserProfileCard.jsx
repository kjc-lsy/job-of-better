import React, {useRef, useState} from 'react';
import {Card, CardBody, CardFooter, CardText, Col, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import maleImg from "../../assets/img/userImg_male.png";
import femaleImg from "../../assets/img/userImg_female.png";
import {useAuth} from "../../contexts/AuthContextProvider";

const UserProfileCard = ({ user }) => {
    const imgRef = useRef();
    const navigate = useNavigate();
    const [profileImg, setProfileImg] = useState(user?.profileImg);
    const {roles} = useAuth()

    const changeProfileImg = () => {
        document.getElementById("profile-img").click();
    };

    const handleImgFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProfileImg(reader.result);
            };
        }
    };

    return (
        <Card className="card-user">
            <CardBody>
                <CardText />
                <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <label htmlFor="profile-img" className="profile_img">
                        <a href="#pablo" onClick={(e) => {
                            e.preventDefault();
                            changeProfileImg();
                        }}>
                            <img alt="profile image"
                                 ref={imgRef}
                                 className="avatar"
                                 src={profileImg || (user?.gender === "F" ? femaleImg : maleImg)}
                            />
                        </a>
                    </label>
                    <input id="profile-img" type="file" accept={"image/*"} style={{ display: 'none' }} onChange={handleImgFileChange} disabled={roles.company} />
                    <h5 className="sub-title">경희대학교</h5>
                    <p className="title">{user?.name}</p>
                </div>
            </CardBody>
            <CardFooter>
                <Row>
                    <Col md={4}>
                        <b>이력서</b>
                        <div className="percent percent288">
                            <span>80%</span>
                        </div>
                        <a onClick={(e) => {
                            e.preventDefault();
                            navigate("/user/resume");
                        }}>
                            바로가기
                        </a>
                    </Col>
                    <Col md={4}>
                        <b>자기소개서</b>
                        <div className={"percent percent" + user?.coverLetterPercent * 3.6}>
                            <span>{user?.coverLetterPercent}%</span>
                        </div>
                        <a onClick={(e) => {
                            e.preventDefault();
                            navigate("/user/cover-letter");
                        }}>
                            바로가기
                        </a>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    );
};

export default UserProfileCard;
