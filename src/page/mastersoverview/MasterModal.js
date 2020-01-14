import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
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

export const MasterAbilityUnlocksHeaderStyle = styled.div`
  font-size: 1.0rem;
`;

export const MasterAbilityDescriptionStyle = styled.div`
  font-size: 0.9rem;
  padding-bottom: 20px;
`;

export function MasterModal({masterKey, isOpenHeroModal, setIsOpenHeroModal}) {
    return (<ReactModal
            className="modalContentStyle"
            isOpen={
                isOpenHeroModal
            }
            onRequestClose={() => setIsOpenHeroModal(false)}

        >
            <div>
                {mastersMapping[masterKey].content}
            </div>

        </ReactModal>
    );
}
