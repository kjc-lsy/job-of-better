import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, CardTitle, Table} from "reactstrap";
import InfoPopUp from "../PopUp/InfoPopUp";
import {format} from "date-fns";
import BtnModal from "../Modal/BtnModal";
import {deleteResumeFile, getFilesByPath, uploadFileToAWS} from "../../apis/user";
import {Button, Loader} from "rsuite";
import PdfViewer from "../Viewer/PdfViewer";
import HwpViewer from "../Viewer/HwpViewer";
import ImagesViewer from "../Viewer/ImagesViewer";
import {ReactComponent as UploadIcon} from "../../assets/img/upload.svg";
import {useAuth} from "../../contexts/AuthContextProvider";
import {getFilesByPathAndIdx} from "../../apis/company";

const ResumeCard = ({idx}) => {
    const [resumeDeleteLoadings, setResumeDeleteLoadings] = useState({})
    const [loading, setLoading] = useState(false)
    const {roles} = useAuth();
    const [resumeFiles, setResumeFiles] = useState([])

    useEffect(() => {
        updateResumeFiles()
    }, []);

    const updateResumeFiles = () => {
        if(roles.user && !roles.company) {
            getFilesByPath('resume').then(res => {
                setResumeFiles(res.data)
            })
        }
        if(roles.company) {
            getFilesByPathAndIdx("resume", idx).then(res => {
                setResumeFiles(res.data)
            })
        }
    }

    const handleResumeFileChange = async (e) => {
        const files = e.target.files;

        setLoading(true)

        try {
            await uploadFileToAWS(files, 'resume')
        } catch (e) {
            console.error(e.response.data);
        } finally {
            setLoading(false)
            updateResumeFiles()
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

    return (
        <Card className="card-user-box">
            <CardHeader>
                <div className="card-title-wrapper">
                    <CardTitle tag="h4" style={{display: "inline-block"}}>이력서</CardTitle>
                    <InfoPopUp>pdf, hwp, jpg, png 형식을 지원합니다.</InfoPopUp>
                </div>
                {roles.company ? null :
                    <div>
                        <input type="file" accept="application/pdf, image/*, .hwp"
                               id="resume-upload"
                               onChange={handleResumeFileChange}
                               style={{display: "none"}}
                               multiple
                        />
                        <label htmlFor="resume-upload" className="justify-content-center align-items-center btn"
                               style={{color: "white"}}>
                            {loading
                                ?
                                <Loader/>
                                :
                                <>
                                    <UploadIcon width={16} height={16} fill={"#fff"}/>업로드
                                </>
                            }
                        </label>
                    </div>
                }
            </CardHeader>
            <CardBody>
                <Table className="tablesorter">
                    <thead className="text-primary">
                    <tr>
                        <th className="text-center">파일명</th>
                        <th className="text-center">등록일</th>
                        <th className="text-center" colSpan={roles.company ? 2 : 1}>이력서 보기</th>
                        {roles.company ? null : <th className="text-center">삭제하기</th>}
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
                            {
                                roles.company ? null :
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
                            }
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default ResumeCard;