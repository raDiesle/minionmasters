import styled from "styled-components";
import React from "react";
import {targetsMapping} from "../attack/targetsMapping";

export function TargetsOverlay({targets}) {

    const AttackTypeStyle = styled.div`
    position: absolute;
    bottom: -4px;
    right: 0px;
    
    & > svg {
        fill: #FFFFFF;     
        color: #FFFFFF;
    }
`;
    const BottomRightCornerStyle = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;   
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-bottom: 30px solid rgba(0,0,0, 0.5);
`;

    if (!targetsMapping[targets]) {
        return <></>;
    } else {
        return <><BottomRightCornerStyle/> <AttackTypeStyle>{targetsMapping[targets]}</AttackTypeStyle></>;
    }

}