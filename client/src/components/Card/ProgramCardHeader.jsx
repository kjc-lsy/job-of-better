import React from 'react';
import {CardHeader, CardTitle} from "reactstrap";
import {getComNameByComIdx} from "../../apis/company";

const ProgramCardHeader = ({program}) => {
    const [comName, setComName] = React.useState('');

    getComNameByComIdx().then((response) => {
        setComName(response.data);
    })

    return (
        <CardHeader>
            <span className="company-name">{comName}</span>
            <CardTitle tag="h1">{program.pgTitle}</CardTitle>
        </CardHeader>
    );
};

export default ProgramCardHeader;