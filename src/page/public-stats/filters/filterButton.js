import ReverseIcon from "components/reverse-icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as classnames from "classnames";
import css from "./filter-button.module.scss"
import cssButton from "components/button.module.scss";
import Tooltip from "rc-tooltip/es";
import React from "react";


export const BUTTON_STATES = {
    ACTIVE: css.ButtonActive,
    INACTIVE: css.ButtonInactive,
    INCLUDE: css.ButtonInclude,
    EXCLUDE: css.ButtonExclude,

}

export function FilterButton({ content, className, handleClick, tooltip = "" }) {

    const button = (
            <button 
                className={classnames([cssButton.ButtonInGroupStyleWithState, className])}
                onClick={(event) => handleClick(event)}
                onContextMenu={(event) => {
                    handleClick(event);
                    event.preventDefault();
                }}
            >
                {content}
            </button>
        )

    return (
        <>
            {!tooltip && button}
            {tooltip && 
                <Tooltip overlay = {tooltip} placement="bottomLeft">
                    {button}
                </Tooltip>}
        </>
    );
}

/* might be rewritten to something easier to set and identify filters */
// function FilterButton({ children, btnkey, filters, setFilters, isShowTooltip = true }) {
//   return (
//     <div className={css.ButtonGroupStyle}>
//       {children.map((buttonContent, position) => {
//         const content = (
//           <button
//             className={classnames(
//               filters[position].isActive ? css.isButtonActive : css.isButtonInactive,
//               css.ButtonInGroupStyleWithState
//             )}
//             onClick={() =>
//               setFilters((prevFilters) => {
//                 const newFilters = { ...prevFilters };
//                 newFilters[btnkey][position].isActive = !prevFilters[btnkey][position].isActive;
//                 return newFilters;
//               })
//             }
//           >
//             {buttonContent}
//           </button>
//         );
//         return isShowTooltip ? (
//           <Tooltip
//             key={position}
//             placement="bottomRight"
//             overlay={<span>{filters[position].btnkey}</span>}
//           >
//             {content}
//           </Tooltip>
//         ) : (
//           <React.Fragment key={position}>{content}</React.Fragment>
//         );
//       })}
//     </div>
//   );
// }
