import React from "react";
import { Button } from "react-bootstrap";
import UserPlus from "react-feather/dist/icons/user-plus";
import styled from "styled-components";

const StyledButton = styled(Button)`
    &&& {
        position: fixed;
        right: 0;
        width: 64px;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1031;
        border-radius: 8px 0 0 8px;
        text-align: center;
        top: 30px;
        border: none;
        &:active {
            outline: none;
            box-shadow: none;
        }
        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
`;

const PlayerButton = (props: any) => (
    <StyledButton onClick={props.onClick}>
        <UserPlus color="white" />
    </StyledButton>
);

export default PlayerButton;
