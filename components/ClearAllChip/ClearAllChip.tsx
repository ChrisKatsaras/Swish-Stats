import React from "react";
import { Badge, Row } from "react-bootstrap";
import { Users, X } from "react-feather";
import styled from "styled-components";

const BadgeText = styled.h6`
    font-size: 1rem;
    margin-bottom: 0px;
    color: white;
    margin-right: 5px;
    margin-left: 5px;
`;

const RemoveIcon = styled(X)``;

const UsersIcon = styled(Users)`
    padding: 5px;
`;

const PlayerBadge = styled(Badge)`
    background: ${props => props.theme.secondary};
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 5px;
    cursor: pointer;
    &:hover ${RemoveIcon} {
        stroke: #fd5d93 !important;
        transition: stroke 0.2s ease-in-out;
    }
`;

interface Props {
    onClick: () => void;
}

const ClearAllChip = (props: Props) => {
    const { onClick } = props;

    return (
        <PlayerBadge pill onClick={onClick}>
            <Row>
                <UsersIcon color="white" size={30} />
                <BadgeText className="align-self-center">Clear All</BadgeText>
                <RemoveIcon className="align-self-center" color="white" />
            </Row>
        </PlayerBadge>
    );
};
export default ClearAllChip;
