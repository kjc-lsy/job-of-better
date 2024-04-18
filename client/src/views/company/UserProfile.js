import React, {useEffect, useRef, useState} from "react";

// reactstrap components
import {Card, CardBody, CardFooter, CardText, Col, Row,} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import maleImg from "../../assets/img/userImg_male.png";
import {getMemberListInfoByIdx} from "../../apis/company";


function UserProfile() {
    const navigate = useNavigate();
    const imgRef = useRef();
    const memIdx = useParams().idx;
    const [user, setUser] = useState({});

    useEffect(() => {
        getMemberListInfoByIdx(memIdx).then(res => {
            setUser(res.data)
        })
    }, []);

    useEffect(() => {
        console.log(user)
    }, [user]);

    return (
        <div className="content">
            <Row>
                <Col md="4">
                    <Card className="card-user">
                        <CardBody>
                            <CardText/>
                            <div className="author">
                                <div className="block block-one"/>
                                <div className="block block-two"/>
                                <div className="block block-three"/>
                                <div className="block block-four"/>
                                <label htmlFor="profile-img" className="profile_img">
                                    <img alt="profile image"
                                         ref={imgRef}
                                         name="profileImg"
                                         className="avatar"
                                         src={maleImg}
                                    />
                                </label>
                                <h5 className="sub-title">{user?.username}</h5>
                                <p className="title">{user?.name}</p>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col md={4}>
                                    <b>이력서</b>
                                    <div className="percent percent360">
                                        <span>80%</span>
                                    </div>
                                    <a onClick={(e) => {
                                        e.preventDefault()
                                        navigate("/")
                                    }}>
                                        바로가기
                                    </a>
                                </Col>
                                <Col md={4}>
                                    <b>자기소개서</b>
                                    <div className={"percent percent360"}>
                                        <span>0%</span>
                                    </div>
                                    <a onClick={(e) => {
                                        e.preventDefault()
                                        navigate("/")
                                    }}>
                                        바로가기
                                    </a>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="8">
                    <Card>
                        <CardBody>
                            <div className="quote-subcategory">기본 정보</div>
                            <div>
                                <label>이름</label>
                                div.

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default UserProfile;
