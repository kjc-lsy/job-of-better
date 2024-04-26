import React from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = () => {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages)
    }

    return (
        <>
            <Document
                file="asd.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber}/>
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </>
    )
};

export default PdfViewer;
