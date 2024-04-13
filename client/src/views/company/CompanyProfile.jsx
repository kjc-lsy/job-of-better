import React from 'react';
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";

const CompanyProfile = () => {
    return (
           <Row className="content">
               <Col>
                   <Card>
                       <CardHeader>
                            <CardTitle tag="h4">회사 프로필</CardTitle>
                       </CardHeader>
                       <CardBody>

                       </CardBody>
                   </Card>
               </Col>
           </Row>
    );
};

export default CompanyProfile;