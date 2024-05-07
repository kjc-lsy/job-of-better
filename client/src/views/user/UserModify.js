import React, {useState} from "react";

// reactstrap components
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Row,} from "reactstrap";
import {useLoading} from "../../contexts/LoadingProvider";
import MyHomeUserInfo from "../../components/Infos/MyHomeUserInfo";
import ModifiedCard from "../../components/Card/ModifiedCard";

function UserProfile() {
    const {loading, setLoading} = useLoading(false);
    const [infoLoading, setInfoLoading] = useState(false);
    const [inputValue, setInputValue] = React.useState({
        name: "",
        username : "",
        address : "",
        detailAddr : "",
        zipCode: "",

        email: "",
        validEmail: false,
        emailUserName: "",
        domain: "",
        
        birthDate: "",

        phone: "",
        validPhone: false,

        profileImg: "", //require("assets/img/emilyz.jpg")
        gender: "",

    });
    const [modifiedValue, setModifiedValue] = React.useState({
        birthDate: "",
        phone : "",
        email: "",
        emailUserName: "",
        domain: "",
        zipCode: "",
        address : "",
        detailAddr : "",
    })
    /*const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true); // 도메인 입력란의 readOnly 상태 관리를 위한 새로운 상태 변수

    const handleDomainChange = (domain) => {
        if (domain === '직접 입력') {
            setIsReadOnly(false);
            setInputValue({...inputValue, domain: ''});
        } else {
            setIsReadOnly(true);
            setInputValue({...inputValue, domain: domain});
        }
    };*/

    return (
        <div className="content user-profile-wrapper">
            {loading ? "" :
            <Row>
                <Col md="4">
                    <MyHomeUserInfo
                        setInfoLoading={setInfoLoading}
                        setLoading={setLoading}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        setModifiedValue={setModifiedValue}
                        modifiedValue={modifiedValue}
                    />
                </Col>
                <Col md="8">
                    {infoLoading &&
                        <ModifiedCard
                            modifiedValue={modifiedValue}
                            setModifiedValue={setModifiedValue}/>
                    }
                </Col>

            </Row>
            }
        </div>
    );
}

export default UserProfile;
