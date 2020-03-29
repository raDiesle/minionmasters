import React, {useState} from "react";
import styled from "styled-components";
import CardDetailsModal from "./CardDetailsModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";

export default function InfoDetailsCardOverlay({card}) {

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
    top: 30%;
    right: 0px;
    padding: 15% 0 15% 15%;
   
    &:hover{
      cursor: pointer;
    }
`;

    const InfoIconStyle = styled(OverlayActionBackground)`
  padding-left: 2px;
`;

    return <>
        {isOpenDetails ? <CardDetailsModal isOpenDetails={isOpenDetails}
                                           setIsOpenDetails={setIsOpenDetails}
                                           card={card}
                                           key={card.pageId}/>
            : null
        }

        <InfoDetailsOverlay onClick={(event) => {
            setIsOpenDetails(true);
            event.stopPropagation();
        }}>
            <InfoIconStyle>
                <FontAwesomeIcon icon={faInfoCircle} size={"sm"}/>
            </InfoIconStyle>
        </InfoDetailsOverlay>

    </>
}