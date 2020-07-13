import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import styled from "styled-components";
import CardDetailsModal from "./CardDetailsModal";

export default function InfoDetailsCardOverlay({card, isFullWidthClickable = false}) {

    const [isOpenDetails, setIsOpenDetails] = useState(false);

    const IconStyleSize = styled.div`
        @media (max-width: 767px) {
            font-size: 0.6rem;
        }
    `;

    const OverlayActionBackground = styled(IconStyleSize)`
    background-color: rgba(0,0,0, 0.5);
    border: 1px dotted rgba(0,0,0, 0.5);
    color: #fff;     
`;


    const InfoDetailsOverlay = styled.div`
        position: absolute;
        top: 0;
        right: 0px;
        padding: ${isFullWidthClickable ? '50% 0 36% 100%' : '50% 0 36% 30%'};
       
        &:hover{
          cursor: pointer;
        }
        &:hover > div {
          color: yellow;
        }
        &:active > div {
          color: #375a7f;
        }
    `;

    const InfoIconStyle = styled(OverlayActionBackground)`
      padding-left: 2px;
  `;

    return <>
        {isOpenDetails ? <CardDetailsModal isOpenDetails={isOpenDetails}
                                           setIsOpenDetails={setIsOpenDetails}
                                           card={card}
                                           key={card.iD}/>
            : null
        }

        <InfoDetailsOverlay onClick={(event) => {
            setIsOpenDetails(true);
            event.stopPropagation();
        }}>
            {
                isFullWidthClickable === false && <InfoIconStyle>
                    <FontAwesomeIcon icon={faInfoCircle} size={"sm"}/>
                </InfoIconStyle>
            }
        </InfoDetailsOverlay>

    </>
}