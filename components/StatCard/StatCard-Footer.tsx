import React from "react";
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
