import React from "react";
import { Button } from "react-bootstrap";
import UserPlus from "react-feather/dist/icons/user-plus";
import styled from "styled-components";

const StyledFooter = styled.div`
    background: #27293d;
    border: 0;
    color: white;
`;

const Footer = (props: any) => (
    <StyledFooter className="card-footer">{props.footerText}</StyledFooter>
);

export default Footer;
