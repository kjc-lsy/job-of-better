import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";
import React from "react";

export default function ComHomeCard({title , subTitle , cnt}) {
    return (
        <Card>
            <CardHeader>
                <h5 className="card-category">{subTitle}</h5>
                <CardTitle tag="h3">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <span>{cnt}</span>명
            </CardBody>
        </Card>
    );
}