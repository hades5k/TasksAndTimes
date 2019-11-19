import React from 'react'

// MUI
import { Tooltip, IconButton } from '@material-ui/core';

export default ({ children, onClick, tip, tipPlacement, btnClassName, tipClassName }) => (
    <Tooltip title={tip} className={tipClassName} placement={tipPlacement}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)
