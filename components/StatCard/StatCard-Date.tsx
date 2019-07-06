import React from "react";
import styled from "styled-components";

const StyledDate = styled.p`
    font-size: 0.75rem;
    margin-bottom: 30px;
    margin-top: 0px;
`;

interface Props {
    date: string;
}

const CardDate = (props: Props) => {
    const { date } = props;
    return <StyledDate className="text-light">{date}</StyledDate>;
};

export default CardDate;
