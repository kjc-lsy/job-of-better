import React, {useState} from 'react';
import {Button, FormGroup, Input} from "reactstrap";
import fileOk from "../../assets/img/fileok.gif";
import companyPaper from "../../assets/img/company_registration.png";

const RegisterFileFormGroup = ({inputValue,setInputValue}) => {
    const [isActive, setIsActive] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        setIsActive(false);
        setUploadedInfo(false)

        const file = event.dataTransfer.files[0];
        setFileInfo(file);
    };

    const handleUpload = (event) => {
        console.log("fileupload");
        setUploadedInfo(false)
        const file = event.target.files[0];
        setFileInfo(file);
    };

    const setFileInfo = (file) => {
        const size = (file.size / (1024 * 1024)).toFixed(2);
       /* const {name, size: byteSize, type} = file;
        const size = (byteSize / (1024 * 1024)).toFixed(2);*/
        //console.log(file , name, size, byteSize, type);
        //setUploadedInfo({name, size, type}); // name, size, type 정보를 uploadedInfo에 저장
        if(size <= 3) {
            setInputValue({...inputValue, b_img: file})
            setUploadedInfo(true)
        }else {
            alert("3MB이상 업로드 할 수 없습니다!")
        }

    };

    const handleDragStart = () => setIsActive(true);

    const handleDragEnd = () => setIsActive(false);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const [uploadedInfo, setUploadedInfo] = useState(false);

    return (
        <FormGroup className="register_file">
            <Input
                id="b_img"
                name="b_img"
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={e => {
                    handleUpload(e);
                    //setInputValue({...inputValue, b_img: e.target.value});
                }}
            />
            <label htmlFor="b_img"
                   className={`preview${isActive ? ' active' : ''}`}
                   onDragEnter={handleDragStart}
                   onDragOver={handleDragOver}
                   onDragLeave={handleDragEnd}
                   onDrop={handleDrop}>

                <div>사업자등록증명원</div>
                <div className="file form-control">
                    {uploadedInfo ? (
                        <>
                            <img src={fileOk} alt=""/>
                            <p>업로드가 완료되었습니다.</p>
                        </>
                    ) : (
                        <>
                            <img src={companyPaper} alt=""/>
                            <Button type="button"
                                    onClick={(e) => document.getElementById("b_img").click()}>파일선택</Button>
                            <p>사업자등록증명원의 발급서류를 첨부해주세요.
                                <span>최대 : 3MB</span></p>
                        </>
                    )}
                </div>
            </label>
        </FormGroup>
    );
};

export default RegisterFileFormGroup;