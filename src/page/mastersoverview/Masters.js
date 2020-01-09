import React from "react";
import {mastersMapping} from "./mastersMapping";

import Master from "./Master";
import styled from "styled-components";

const MastersStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

export default function Masters({setSelectedHero}) {

    return (
        <div>
            <MastersStyle>
                {
                    Object.keys(mastersMapping).map(masterKey =>
                        <div key={masterKey}>
                            <Master masterKey={masterKey}
                                    isMastersSelection
                                    setSelectedHero={setSelectedHero}
                            />
                        </div>)
                }
            </MastersStyle>
        </div>
    );
}