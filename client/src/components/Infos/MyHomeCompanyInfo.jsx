import React, {useRef} from "react";
import {uploadFileToAWS} from "../../apis/user";
import {Card, CardBody, CardText} from "reactstrap";
import femaleImg from "../../assets/img/userImg_female.png";
import maleImg from "../../assets/img/userImg_male.png";
import {useNavigate} from "react-router-dom";
import ProgramListCard from "../Card/ProgramListCard";

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
                                changeProfileImg(e);
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
                    </div>
                </CardBody>
            </Card>
            <ProgramListCard/>
        </>
    )
}