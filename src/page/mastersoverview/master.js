import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "rc-tooltip/es";
import React, {useState} from "react";
import styled from "styled-components";
import {MasterModal} from "./MasterModal";
import {mastersMapping} from "./mastersMapping";

const OverlayActionBackground = styled.div`
    background-color: rgba(0,0,0, 0.5);
    border: 1px dotted rgba(0,0,0, 0.5);
    color: #fff;     
`;
const IconStyle = styled(OverlayActionBackground)`
  padding-left: 2px;
`;

const MasterContentStyle = styled.div`
    position: relative;
 //   margin-right: 2px;
`;

const InfoMasterDetailsOverlay = styled.div`
    position: absolute;
    top: 0px;
    padding: 35px 0 35px ${({actionRegistrationComponent}) => actionRegistrationComponent === null ? "90px" : "35px"};
    right: 0px;
 
    @media (max-width: 767px) {
        padding: 11px 0 11px ${({actionRegistrationComponent}) => actionRegistrationComponent === null ? "50px" : "11px"};
    }
   
    &:hover{
      cursor: pointer;
    }
    
    &:hover > div {
      color: yellow;
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
  
  &:hover{
    border-color: yellow;
  }
`;

export default function Master({masterKey, actionRegistrationComponent = null}) {
    const [isOpenHeroModal, setIsOpenHeroModal] = useState(false);

    return <MasterSelectedContainer>
        <MasterModal isOpenHeroModal={isOpenHeroModal}
                     setIsOpenHeroModal={setIsOpenHeroModal}
                     masterKey={masterKey}
        />

        <Tooltip placement="top"
                 overlay={<span>{masterKey}</span>}>
            <MasterContentStyle>
                <InfoMasterDetailsOverlay
                    actionRegistrationComponent={actionRegistrationComponent}
                    onClick={(event) => {
                        setIsOpenHeroModal(true);
                        event.stopPropagation();
                    }}
                >

                    {
                        actionRegistrationComponent !== null && <IconStyle>
                            <FontAwesomeIcon icon={faInfoCircle} size={"sm"}/>
                        </IconStyle>
                    }
                </InfoMasterDetailsOverlay>

                { // to unregister on rerender bug
                    actionRegistrationComponent && actionRegistrationComponent(masterKey)
                }
                <MasterImgStyle src={"generated/img/" + mastersMapping[masterKey].icon}
                                alt={masterKey}/>
            </MasterContentStyle>
        </Tooltip>
    </MasterSelectedContainer>
}