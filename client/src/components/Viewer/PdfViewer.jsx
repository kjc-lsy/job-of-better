import React, {useRef} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import {Loader} from "rsuite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({fileUrl}) => {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(2);
    const [isLoading, setIsLoading] = React.useState(true);
    const pdfRef = useRef(null);

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages)
        setIsLoading(false)
    }

    return (
        <>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Loader/>
                </div>}
            <Document
                inputRef={pdfRef}
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={isLoading}
                options={{workerSrc: "/pdf.worker.js"}}
            >
                <Page
                    pageNumber={pageNumber}
                    width={pdfRef.current?.clientWidth}
                    height={pdfRef.current?.clientHeight}
                />
            </Document>
            {
                !isLoading && (
                    <p>
                        <span onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}><FontAwesomeIcon icon={faArrowLeft}/></span>
                        <span style={{padding: '0 10px'}}>{pageNumber} / {numPages}</span>
                        <span onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)}><FontAwesomeIcon icon={faArrowRight}/></span>
                    </p>
                )
            }

        </>
    )
};

export default PdfViewer;
