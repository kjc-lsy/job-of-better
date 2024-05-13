import React, {useState} from "react";

// reactstrap components
import {Col, Row,} from "reactstrap";
import {useLoading} from "../../contexts/LoadingProvider";
import ModifiedCard from "../../components/Card/ModifiedCard";
import MyHomeCompanyInfo from "../../components/Infos/MyHomeCompanyInfo";
import {useAuth} from "../../contexts/AuthContextProvider";
import ModifyComCard from "../../components/Card/ModifyComCard";

function CompanyProfile() {
    const {loading, setLoading} = useLoading(false);
    const [infoLoading, setInfoLoading] = useState(false);
    const {user} = useAuth()
    const [inputValue, setInputValue] = useState({
        b_no: "",
        b_name: "",
        b_ceoName: "",
        validBCeoName: false,
        b_img: "",
        b_tel: "",
        validBTel: false,
        zipCode: "",
        address: "",
        detailAddr: "",
        b_openingDate: new Date(),
    });
    const [companyModifiedValue, setCompanyModifiedValue] = useState({
        b_no: "",
        b_name: "",
        b_ceoName: "",
        b_img: "",
        b_tel: "",
        zipCode: "",
        address: "",
        detailAddr: "",
        b_openingDate: new Date(),
    })
    const [modifiedValue, setModifiedValue] = React.useState({
        name: user.name,
        username: user.username,
        phone: user.phone,
        email: user.email,
        emailUserName: (user.email)?.split("@")[0],
        domain: (user.email)?.split("@")[1],
    });

    return (
        <div className="content user-profile-wrapper">
            <Row>
                <Col md="4">
                    <MyHomeCompanyInfo
                        setInfoLoading={setInfoLoading}
                        setLoading={setLoading}
                        inputValue={modifiedValue}
                        setInputValue={setModifiedValue}
                        user={user}
                    />
                </Col>
                <Col md="8">
                    <ModifiedCard
                        modifiedValue={modifiedValue}
                        setModifiedValue={setModifiedValue}
                    />
                    <ModifyComCard/>
                </Col>
            </Row>
        </div>
    );
}

export default CompanyProfile;
