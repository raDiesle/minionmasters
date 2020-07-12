import {faTimesCircle} from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import {mastersMapping} from "./mastersMapping";

export const MasterHeaderStyle = styled.h3`
  padding-bottom: 0.5rem;
`;

export const MasterAbilityImageStyle = styled.img`
  width: 30px;
  height: 30px;  
`;

export const MasterAbilityImageRoundedStyle = styled(MasterAbilityImageStyle)`
  border-radius: 50%;
`;

export const MasterAbilityHeaderStyle = styled.div`
  font-size: 1.1rem;
`;

export const MasterAbilitySubHeader = styled.div`
  font-size: 1.05rem;
`;

export const MasterAbilityUnlocksHeaderStyle = styled.div`
  font-size: 1.0rem;
`;


export const MasterAbilityDescriptionStyle = styled.div`
  font-size: 0.9rem;
  padding-bottom: 20px;
`;

export const AbilityUlStyle = styled.ul`

`;

const ModalCloseStyle = styled.div`
    display: flex;
    justify-content: flex-end;
  & > svg {
    
      
      &:hover{
        color: #a0a0a0;
        filter:drop-shadow(1px 1px 1px #a0a0a0);
        cursor: pointer;
      }
  }
`;

export function MasterModal({masterKey, isOpenHeroModal, setIsOpenHeroModal}) {
    return (<ReactModal
            className="modalContentStyle"
            isOpen={
                isOpenHeroModal
            }
            onRequestClose={() => setIsOpenHeroModal(false)}

        >
            <ModalCloseStyle><FontAwesomeIcon icon={faTimesCircle} size={"2x"}
                                              onClick={() => setIsOpenHeroModal(false)}/> </ModalCloseStyle>
            <div>
                {mastersMapping[masterKey].content}
            </div>

        </ReactModal>
    );
}
