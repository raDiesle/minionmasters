import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import React from "react";


const OverlayActionBackground = styled.div`
    background-color: rgba(0,0,0, 0.5);
    border: 1px dotted rgba(0,0,0, 0.5);
    color: #fff;     
`;

const AddMasterToDeckIconStyle = styled(OverlayActionBackground)`
  padding-left: 2px;
`;

const AddMasterToDeckOverlay = styled.div`
    position: absolute;
    top: 36px;
    left: 0px;
    
      @media (max-width: 767px) {
        top: 13px;
      }
    
  //  padding: 15px 15px 15px 0;    
    &:hover{
      cursor: pointer;
    }
`;

export default function AddMasterToDeck({setSelectedHero, masterKey}) {
    return (
        <AddMasterToDeckOverlay
            onClick={() => {
                setSelectedHero(masterKey);
            }}>
            <AddMasterToDeckIconStyle>
                <FontAwesomeIcon icon={faPlusCircle} size={"sm"}/>
            </AddMasterToDeckIconStyle>
        </AddMasterToDeckOverlay>
    )
}