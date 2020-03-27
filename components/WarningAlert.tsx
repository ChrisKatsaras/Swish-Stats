import React from "react";
import { Alert } from "react-bootstrap";
import { AlertTriangle } from "react-feather";
import styled from "styled-components";

const StyledAlertTriangle = styled(AlertTriangle)`
    margin-right: 10px;
`;

const WarningAlert = (props: any) => (
    <Alert variant="warning">
        <StyledAlertTriangle />
        {props.text}
    </Alert>
);

export default WarningAlert;
