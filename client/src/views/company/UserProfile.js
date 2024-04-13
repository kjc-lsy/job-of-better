import React, {useEffect, useRef, useState} from "react";

// reactstrap components
import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Row,} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContextProvider";
import maleImg from "../../assets/img/userImg_male.png";
import {getMemberListInfoByIdx} from "../../apis/user";


function UserProfile() {
    const navigate = useNavigate();
    const {isLogin} = useAuth();
    const imgRef = useRef();
    const memIdx = useParams().idx;
    const [user, setUser] = useState({});

    useEffect(() => {
        if(isLogin) {
            getMemberListInfoByIdx(memIdx).then(res =>{
                setUser(res.data)
            })
        }
    }, [isLogin]);

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
                                <h5 className="title">{user?.name}</h5>
                                <p className="description">{user?.username}</p>
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
                        <CardHeader>
                            <CardTitle tag="h4">회원정보</CardTitle>
                            <p className="category"></p>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default UserProfile;