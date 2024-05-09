import {Viewer, Worker} from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

import React from 'react';

const PdfViewer = ({fileUrl}) => {
    return (
        <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
                <Viewer fileUrl={fileUrl} />
            </Worker>
        </div>
    );
};

export default PdfViewer;