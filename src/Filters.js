import React from "react";
import styled from "styled-components"
import AccursedIcon from "./faction/AccursedIcon";
import CrystalElfIcon from "./faction/CrystalElfIcon";
import EmpyrianIcon from "./faction/EmpyrianIcon";
import OutlanderIcon from "./faction/OutladerIcon";
import ScratIcon from "./faction/ScratIcon";
import SlitherIcon from "./faction/SlitherIcon";
import VoidBourneIcon from "./faction/VoidbourneIcon";

export function Filters() {

    const FilterContainerStyle = styled.div`
        padding: 20px 10px;
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
        <ButtonGroup>
            <button><AccursedIcon/></button>
            <button><CrystalElfIcon/></button>
            <button><EmpyrianIcon/></button>
            <button><OutlanderIcon/></button>
            <button><ScratIcon/></button>
            <button><SlitherIcon/></button>
            <button><VoidBourneIcon/></button>
        </ButtonGroup>
    </FilterContainerStyle>
}