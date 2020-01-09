import styled from "styled-components";
import React from "react";
import Master from "../mastersoverview/Master";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";

const MasterDeckSlotStyle = styled.div`
    width: 128px;
    height: 128px;
    
    @media (max-width: 767px) {
      height: 71px;
      width: 60px;
    }
    
    border: 1px rebeccapurple dotted;
    border-radius: 40px;
    margin-right: 20px;
    text-align: center;
`;

const MasterContentStyle = styled.div`
    position: relative;
`;

export default function MasterDeckSlot({selectedHero, setSelectedHero}) {

    return <MasterDeckSlotStyle>
        <MasterContentStyle>
            {
                selectedHero ?
                    <Master isMastersSelection={false} masterKey={selectedHero} setSelectedHero={setSelectedHero}/>
                    : <div style={{alignText: "center"}}> Select Master by <FontAwesomeIcon icon={faPlusCircle}
                                                                                            size={"sm"}/> below</div>}
        </MasterContentStyle>
    </MasterDeckSlotStyle>;
}