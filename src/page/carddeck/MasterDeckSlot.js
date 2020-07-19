import React from "react";
import styled from "styled-components";
import Master from "../mastersoverview/master";


const MasterDeckSlotStyle = styled.div`
    display: flex;
    
    position: relative;
    
    width: 90px;
    height: 90px;
    margin-top: 3px;
    margin-right: 7px;
    
    @media (max-width: 767px) {     
      height: 50px;
      width: 50px;
      //margin-top: 5px;
    }    
`;


const MasterContentStyle = styled.div`
 //   width: 100%;
 //   position: relative;
`;

const MasterPlaceholder = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    padding: 20% 15%;  
    cursor: pointer;
    text-decoration: none; 
     
      @media (max-width: 767px) {
        font-size: 0.6rem;     
      }
           
    &:before {
      position: absolute;
      content: '';
      height: 100%; 
      width: 100%; 
      border: 2px dashed #fff;
      top: 0px;
      left: 0px;
      border-radius: 50%;
      animation: spin 10s linear infinite;
      
  }
  
  :hover::before {
    border-color: yellow;
  }


    @keyframes spin { 
      100% { 
        transform: rotateZ(360deg); 
    }
}
`;


export default function MasterDeckSlot({selectedHero, setSelectedHero, setSelectedTabIndex}) {

    let MASTERS_TAB_INDEX = 1;
    return <MasterDeckSlotStyle>
        <MasterContentStyle>
            {
                selectedHero ?
                    <Master isMastersSelection={false} masterKey={selectedHero} setSelectedHero={setSelectedHero}/>
                    : <MasterPlaceholder onClick={() => setSelectedTabIndex(MASTERS_TAB_INDEX)}>
                        Select Master
                    </MasterPlaceholder>}
        </MasterContentStyle>
    </MasterDeckSlotStyle>;
}