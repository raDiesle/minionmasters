import styled from "styled-components";
import React from "react";

const ButtonGroupStyle = styled.div`                  
      & > button {
        
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

const ButtonInGroupStyle = styled.button`
  background-color: ${({isButtonActive}) => isButtonActive ? "#111" : "#444"};
`;

function ButtonFilterGroup({children, btnkey, filters, setFilters}) {

    return <ButtonGroupStyle>
        {children.map((buttonContent, position) =>
            <ButtonInGroupStyle key={position} onClick={() => (
                setFilters((prevFilters) => {
                    const newFilters = {...prevFilters};
                    newFilters[btnkey][position].isActive = !prevFilters[btnkey][position].isActive;
                    return newFilters;
                }))}
                                isButtonActive={filters[position].isActive}
            >
                {buttonContent}
            </ButtonInGroupStyle>
        )}
    </ButtonGroupStyle>
}

export {ButtonGroupStyle, ButtonInGroupStyle, ButtonFilterGroup};