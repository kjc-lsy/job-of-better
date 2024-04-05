import React from 'react';
import {CardHeader, CardTitle, Col, Row} from "reactstrap";
import {getComNameByComIdx} from "../../apis/program";

const ProgramCardHeader = ({program}) => {
    const [comName, setComName] = React.useState('');

    getComNameByComIdx(program.pgComIdx).then((response) => {
        setComName(response.data);
    })

    return (
        <CardHeader>
            <Row>
                <Col>
                    <span className="company-name">{comName}</span>
                    <CardTitle tag="h1">{program.pgTitle}</CardTitle>
                </Col>
            </Row>
        </CardHeader>
    );
};

export default ProgramCardHeader;