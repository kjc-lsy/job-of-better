import React, {useRef} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({fileUrl}) => {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(2);
    const [isLoading, setIsLoading] = React.useState(true);
    const pdfRef = useRef(null);

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages)
    }

    return (
        <>
            <Document
                inputRef={pdfRef}
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={isLoading}
                options={{workerSrc: "/pdf.worker.js"}}
            >
                <Page
                    renderMode={"svg"}
                    pageNumber={pageNumber}
                    width={pdfRef.current?.clientWidth}
                    height={pdfRef.current?.clientHeight}
                />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </>
    )
};

export default PdfViewer;
