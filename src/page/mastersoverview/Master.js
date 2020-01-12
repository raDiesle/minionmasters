import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {mastersMapping} from "./mastersMapping";
import React, {useState} from "react";
import styled from "styled-components";
import MasterModal from "./MasterModal";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";

const MasterContentStyle = styled.div`
    position: relative;
 //   margin-right: 2px;
`;

const InfoMasterDetailsOverlay = styled.div`
    position: absolute;
    top: 35px;
    right: 0px;
 
  @media (max-width: 767px) {
        top: 13px;
      }
   
    &:hover{
      cursor: pointer;
    }
`;

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
    top: 35px;
    left: 0px;
    
      @media (max-width: 767px) {
        top: 13px;
      }
    
  //  padding: 15px 15px 15px 0;    
    &:hover{
      cursor: pointer;
    }
    
    
`;

const MasterImgStyle = styled.img`
      width: 90px;
      height: auto;
  
   @media (max-width: 767px) {
      width: 50px;
      height: auto;
   }
`;

const MasterSelectedContainer = styled.div`
  border: 2px groove #000;
  border-radius: 50%;
  overflow:hidden;
`;

export default function Master({masterKey, selectedHero = "", isMastersSelection, setSelectedHero,}) {
    const [isOpenHeroModal, setIsOpenHeroModal] = useState(false);

    return <MasterSelectedContainer>
        <MasterModal isOpenHeroModal={isOpenHeroModal}
                     setIsOpenHeroModal={setIsOpenHeroModal}
                     masterKey={masterKey}
        />
        <MasterContentStyle>

            {
                isMastersSelection &&
                <AddMasterToDeckOverlay

                    onClick={() => {
                        setSelectedHero(masterKey);
                    }}>
                    <AddMasterToDeckIconStyle>
                        <FontAwesomeIcon icon={faPlusCircle} size={"sm"}/>
                    </AddMasterToDeckIconStyle>
                </AddMasterToDeckOverlay>
            }
            <InfoMasterDetailsOverlay onClick={(event) => {
                setIsOpenHeroModal(true);
                event.stopPropagation();
            }}>
                <AddMasterToDeckIconStyle>
                    <FontAwesomeIcon icon={faInfoCircle} size={"sm"}/>
                </AddMasterToDeckIconStyle>
            </InfoMasterDetailsOverlay>
            <MasterImgStyle src={"generated/img/" + mastersMapping[masterKey].icon}
                            alt={masterKey}/>
        </MasterContentStyle>
    </MasterSelectedContainer>
}