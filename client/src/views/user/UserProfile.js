import React, {useEffect, useRef} from "react";
import * as user from '../../apis/user';
import {uploadFileToAWS, userProfileInfo} from '../../apis/user';
import femaleImg from "../../assets/img/userImg_female.png";
import maleImg from "../../assets/img/userImg_male.png";

// reactstrap components
import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Row, Table,} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight, faArrowCircleUp, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useLoading} from "../../contexts/LoadingProvider";
import MyHomeProgramInfo from "../../components/Infos/MyHomeProgramInfo";
import MyHomeUserInfo from "../../components/Infos/MyHomeUserInfo";

function UserProfile() {
    const {loading, setLoading} = useLoading(false);

    const [inputValue, setInputValue] = React.useState({
        name: "",
        profileImg: "", //require("assets/img/emilyz.jpg")
        gender: "",
        pgRegStatus: "",

        resumeLength: 0,
        resumeTotalLength: 0,
        resumePercent: 0,
        coverLetterLength: 0,
        coverLetterTotalLength: 0,
        coverLetterPercent: 0,

        mclTitle: "",
        mclDate: "",
        mclIsConfirm: "",

        resumeTitle: "",
        resumeIsConfirm: "",

        registeredInterviewDatetime: null,
        registeredInterviewDate: null,
        registeredInterviewTime: null,

        assignedInterviewDate: "",
    });



    return (
        <div className="content">
            {loading ? null :
                <Row>
                    <Col md="4">
                        <MyHomeUserInfo setLoading={setLoading} inputValue={inputValue} setInputValue={setInputValue} />
                    </Col>
                    <Col md="8">
                        <MyHomeProgramInfo inputValue={inputValue} setInputValue={setInputValue} />
                    </Col>

                </Row>
            }
        </div>
    );
}

export default UserProfile;
