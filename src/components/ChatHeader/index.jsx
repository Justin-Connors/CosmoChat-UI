import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ChatHeader({ recipient }) {
  return (
    <AppBar position="static" sx={{ bgcolor: '#f0f0f0', color: 'black' }}>
      <Toolbar>
        <Avatar alt={recipient} src="/path/to/avatar.jpg" />
        <Typography variant="h6" sx={{ ml: 2 }}>{recipient}</Typography>
        <IconButton sx={{ ml: 'auto' }}>
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ChatHeader;
