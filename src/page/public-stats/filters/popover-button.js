import * as React from 'react';
// import css from "./advanced-filter-modal.module.scss";
import Popover from '@mui/material/Popover';

function PopoverButton({className = "", children, buttonContent, buttonStyle, popoverStyle}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.preventDefault(); //right click
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <button className = {className} style={buttonStyle} aria-describedby={id} onClick={handleClick} onContextMenu={handleClick}>
        {buttonContent}
      </button>
      <Popover
        disableScrollLock={true}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => { e.preventDefault(); setAnchorEl(null); }}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              // minWidth: "300px",
              padding: "12px",
              border: "medium solid #44C",
              borderRadius: "8px",
              backgroundColor: "#444",
              color: "#FFF",
              ...popoverStyle,
            },
            

          }
      }}  
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </>
  );
}

// Setting default props
PopoverButton.defaultProps = {
    buttonContent: 'Open Modal',  // Default button content
  };

export {PopoverButton}