import * as React from 'react';
import css from "./advanced-filter-modal.module.scss";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

export default function AdvancedFiltersPopover(className = "", children) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={className}>
      <Button className={className} aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div>{children}</div>
      </Popover>
    </div>
  );
}