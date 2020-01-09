import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {mastersMapping} from "./mastersMapping";
import React, {useState} from "react";
import styled from "styled-components";
import InfoMasterDetailsModal from "./InfoMasterDetailsModal";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";

const MasterContentStyle = styled.div`
    position: relative;
    margin-right: 2px;
`;

const InfoMasterDetailsOverlay = styled.div`
    position: absolute;
    top: 35px;
    right: 0px;
    padding: 15px 0 15px 15px;
   
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
    padding: 15px 15px 15px 0;    
    &:hover{
      cursor: pointer;
    }
`;

export default function Master({masterKey, selectedHero = "", isMastersSelection, setSelectedHero,}) {
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    return <>
        <InfoMasterDetailsModal isOpenDetails={isOpenDetails}
                                setIsOpenDetails={setIsOpenDetails}
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
                setIsOpenDetails(true);
                event.stopPropagation();
            }}>
                <AddMasterToDeckIconStyle>
                    <FontAwesomeIcon icon={faInfoCircle} size={"sm"}/>
                </AddMasterToDeckIconStyle>
            </InfoMasterDetailsOverlay>
            <img src={"generated/img/" + mastersMapping[masterKey].icon}
                 alt={masterKey}/>
        </MasterContentStyle>
    </>
}