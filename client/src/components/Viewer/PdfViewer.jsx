import React, {useRef} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({fileUrl}) => {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
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
            >
                <Page
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
