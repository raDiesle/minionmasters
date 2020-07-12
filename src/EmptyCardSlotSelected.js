import React from "react";
import styled from "styled-components";

export default function EmptyCardSlotSelected({children, onClick}) {

    const EmptyCardSlotSelectedStyle = styled.a`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    padding: 25% 15%;
    margin-top: 2px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    
  @media (max-width: 767px) {
      font-size: 9px;
   }

      background: 
        linear-gradient(90deg, #000 50%, transparent 50%),
        linear-gradient(0deg, #000 50%, transparent 50%),
        linear-gradient(90deg, #000 50%, transparent 50%),
        linear-gradient(0deg, #000 50%, transparent 50%);
      background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
      background-size: 15px 2px, 2px 15px, 15px 2px, 2px 15px;
      background-position: left top, right top, left bottom, left top;
      animation: border-dance 4s infinite linear;
    }
    
    @keyframes border-dance 
    {
      0%
      {
        background-position: left top, right top, right bottom, left bottom;
      }
      100% 
      {
        background-position: right top, right bottom, left bottom, left top;
      }
`;

    return <EmptyCardSlotSelectedStyle onClick={onClick}>{children}</EmptyCardSlotSelectedStyle>;
}