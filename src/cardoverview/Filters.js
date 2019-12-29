import React from "react";
import styled from "styled-components"
import AccursedIcon from "../faction/AccursedIcon";
import CrystalElfIcon from "../faction/CrystalElfIcon";
import EmpyrianIcon from "../faction/EmpyrianIcon";
import OutlanderIcon from "../faction/OutladerIcon";
import ScratIcon from "../faction/ScratIcon";
import SlitherIcon from "../faction/SlitherIcon";
import VoidBourneIcon from "../faction/VoidbourneIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import {faMinusSquare} from "@fortawesome/free-solid-svg-icons/faMinusSquare";
import {rarityMapping} from "../rarity/rarityMapping";
import {typeMapping} from "../cardtype/typeMapping";
import {faSquare} from "@fortawesome/free-solid-svg-icons/faSquare";

export function Filters() {

    const FilterContainerStyle = styled.div`
        display: flex;
        padding: 20px 10px;
        
        & > div {
            padding-right: 20px;
        }
    `;

    const ButtonGroup = styled.div`                  
      & > button {
          background-color: #444; 
          border: 1px solid #000000;          
          color: white;           
          cursor: pointer; 
          float: left; 
        }
        
        & > button:first-child {           
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        
        & > button:last-child {           
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        
        & > button:not(:last-child) {
          border-right: none; 
        }
        
        &:after {
          content: "";
          clear: both;
          display: table;
        };
        `;

    return <FilterContainerStyle>
        <div>
            Faction
            <ButtonGroup>
                <button><AccursedIcon/></button>
                <button><CrystalElfIcon/></button>
                <button><EmpyrianIcon/></button>
                <button><OutlanderIcon/></button>
                <button><ScratIcon/></button>
                <button><SlitherIcon/></button>
                <button><VoidBourneIcon/></button>
            </ButtonGroup>
        </div>

        <div>
            Size
            <ButtonGroup>
                <button><FontAwesomeIcon icon={faMinusSquare}/></button>
                <button>normal</button>
                <button><FontAwesomeIcon icon={faPlusSquare}/></button>
            </ButtonGroup>
        </div>

        <div>
            Manacost
            <ButtonGroup>
                {[...Array(11).keys()].map((number) => <button key={number}>{number}</button>)}
            </ButtonGroup>
        </div>

        <div>
            Rare
            <ButtonGroup>
                {
                    Object.keys(rarityMapping).map(rarity =>
                        <button key={rarity} style={{color: rarityMapping[rarity]}}>
                            <FontAwesomeIcon icon={faSquare} size={"xs"}/>
                        </button>)
                }
            </ButtonGroup>
        </div>

        <div>
            Type
            <ButtonGroup>
                {
                    Object.keys(typeMapping).map(type => <button key={type}><FontAwesomeIcon icon={typeMapping[type]}
                                                                                             size={"xs"}/></button>)
                }
            </ButtonGroup>
        </div>
    </FilterContainerStyle>
}