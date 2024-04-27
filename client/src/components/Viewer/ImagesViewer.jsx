import React, {useEffect, useState} from 'react';
import {Loader} from "rsuite"; // Material-UI 로딩 스피너 컴포넌트

const ImagesViewer = ({ fileUrl }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = fileUrl;
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
            setIsLoading(false);
            console.error('이미지 로딩 실패');
        };
    }, [fileUrl]);

    return (
        isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Loader />
            </div>
        ) : (
            <img src={fileUrl} style={{minWidth: '30vw'}} />
        )
    );
};

export default ImagesViewer;
