import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
    background: ${props => props.theme.secondary};
    border: 0;
    color: white;
`;

interface Props {
    footerText: string;
}

const Footer = (props: Props) => (
    <StyledFooter className="card-footer text-center">
        {props.footerText}
    </StyledFooter>
);

export default Footer;
