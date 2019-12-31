import styled from "styled-components";
import React, {useEffect} from "react";

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

export function ButtonGroup({children, model, setModel}) {
    const buttonKeys = [];
    React.Children.forEach(children, element => {
        buttonKeys.push(element.props.btnKey);
    });

    useEffect(() => {
        if (model.length > 0) {
            return;
        }
        setModel(children.map((content, key) => {
            return {
                buttonKey: [buttonKeys[key]],
                isActive: false
            }
        }));

    }, []);

    return <ButtonGroupStyle>
        {children.map((buttonContent, position) =>
            <ButtonInGroupStyle onClick={() => (setModel((prevState) => {
                const newState = [...prevState];
                newState[position].isActive = !prevState[position].isActive;
                return newState;
            }))}
                                isButtonActive={model[position]?.isActive}
            >
                {buttonContent}
            </ButtonInGroupStyle>
        )}
    </ButtonGroupStyle>
}