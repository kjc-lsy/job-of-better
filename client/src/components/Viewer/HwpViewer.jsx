import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Viewer} from 'hwp.js';
import {Loader} from "rsuite";

function HwpViewer({ fileUrl }) {
    const ref = useRef(null);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 초기화

    const showViewer = useCallback((file) => {
        const reader = new FileReader();

        reader.onloadend = (result) => {
            var _a;
            const bstr = (_a = result.target) === null || _a === void 0 ? void 0 : _a.result;

            if (bstr) {
                new Viewer(ref.current, bstr);
                setIsLoading(false); // 파일 로드 완료 후 로딩 상태 업데이트
            }
        };

        reader.readAsBinaryString(file);
    }, []);

    const loadFile = useCallback(() => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function (event) {
            showViewer(new File([xhr.response], 'random'));
        };
        xhr.open('GET', fileUrl);
        xhr.send();
    }, [fileUrl, showViewer]);

    useEffect(() => {
        loadFile();
    }, [loadFile]);

    return (
        <div className="viewer" ref={ref}>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Loader/>
                </div>
            ) : null}
        </div>
    );
}

export default HwpViewer;
