import React from "react";
import {mastersMapping} from "./mastersMapping";

import Master from "./master";
import styled from "styled-components";

const MastersStyle = styled.a`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

export default function Masters({actionRegistrationComponent}) {

    return (
        <MastersStyle name="mastersview">
            {
                Object.keys(mastersMapping).map(masterKey =>
                    <div key={masterKey}>
                        <Master masterKey={masterKey}
                                actionRegistrationComponent={actionRegistrationComponent}
                        />
                    </div>)
            }
        </MastersStyle>
    );
}