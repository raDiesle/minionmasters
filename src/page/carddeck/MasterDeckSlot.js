import styled from "styled-components";
import React from "react";
import Master from "../mastersoverview/Master";


const MasterDeckSlotStyle = styled.div`
    display: flex;
    
  position: relative;
    
    width: 100px;
    height: 100px;
    margin: 12px 3px 0 0;
    
    @media (max-width: 767px) {     
      height: 60px;
      width: 60px;
      margin-top: 5px;
    }   
`;


const MasterContentStyle = styled.div`
    width: 100%;
    position: relative;
`;

const MasterSelectedContainer = styled.div`
  border: 2px groove #000;
  border-radius: 50%;
  overflow:hidden;
`;

const MasterPlaceholder = styled.div`
 width: 100%;
 display: flex;
 flex-direction: column;
 flex-wrap: wrap;
 text-align: center;
  padding: 20% 15%;
  
   @media (max-width: 767px) {
    font-size: 12px;
   }
     
&:before {
  position: absolute;
  content: '';
  height: 100%; 
  width: 100%; 
  border: 2px dashed #000;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  animation: spin 10s linear infinite;
  
}

@keyframes spin { 
  100% { 
    transform: rotateZ(360deg); 
  }
}
`;


export default function MasterDeckSlot({selectedHero, setSelectedHero}) {

    return <MasterDeckSlotStyle>

        <MasterContentStyle>
            {
                selectedHero ?
                    <MasterSelectedContainer>
                        <Master isMastersSelection={false} masterKey={selectedHero} setSelectedHero={setSelectedHero}/>
                    </MasterSelectedContainer>
                    : <MasterPlaceholder>
                        Select Master
                    </MasterPlaceholder>}
        </MasterContentStyle>
    </MasterDeckSlotStyle>;
}