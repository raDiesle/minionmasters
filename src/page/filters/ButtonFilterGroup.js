import Tooltip from "rc-tooltip/es";
import React from "react";
import styled from "styled-components";

const ButtonColor = styled.div`
  & > * {
    color: white;
    float: left;
  }

  & > *:hover:not(:disabled) {
    color: yellow;
  }
`;

const ButtonGroupStyle = styled(ButtonColor)`
  & > * {
    border: 1px solid #000000;
  }

  & > *:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  & > *:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  & > *:not(:last-child):not(:hover) {
    border-right-color: #444;
  }

  &:after {
    content: "";
    clear: both;
    display: table;
  }
`;

const ButtonInGroupStyle = styled.button`
  &:disabled {
    background-color: grey;
  }
  background-color: ${({ isButtonActive }) => (isButtonActive ? "#111" : "#444")};
  cursor: pointer;
  border: 1px solid #111;
  &:hover {
    border-color: yellow;
  }

  &:focus {
    outline: none;
    // background-color: #375a7f;
  }
`;

/* might be rewritten to something easier to set and identify filters */
function ButtonFilterGroup({ children, btnkey, filters, setFilters, isShowTooltip = true }) {
  return (
    <ButtonGroupStyle>
      {children.map((buttonContent, position) => {
        const content = (
          <ButtonInGroupStyle
            onClick={() =>
              setFilters((prevFilters) => {
                const newFilters = { ...prevFilters };
                newFilters[btnkey][position].isActive = !prevFilters[btnkey][position].isActive;
                return newFilters;
              })
            }
            isButtonActive={filters[position].isActive}
          >
            {buttonContent}
          </ButtonInGroupStyle>
        );
        return isShowTooltip ? (
          <Tooltip
            key={position}
            placement="bottomRight"
            overlay={<span>{filters[position].btnkey}</span>}
          >
            {content}
          </Tooltip>
        ) : (
          <React.Fragment key={position}>{content}</React.Fragment>
        );
      })}
    </ButtonGroupStyle>
  );
}

export { ButtonGroupStyle, ButtonInGroupStyle, ButtonFilterGroup, ButtonColor };
