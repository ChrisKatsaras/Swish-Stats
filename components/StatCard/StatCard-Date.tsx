import React from "react";
import styled from "styled-components";

const StyledDate = styled.p`
    font-size: 0.75rem;
    margin-bottom: 30px;
    margin-top: 0px;
`;

const CardDate = (props: any) => (
    <StyledDate className="text-light">{props.date}</StyledDate>
);

export default CardDate;
