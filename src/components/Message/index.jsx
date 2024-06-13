import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

function Message({ message }) {
  const isUser = message.sender === 'You';

  return (
    <Box sx={{ display: 'flex', mb: 2, justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      {!isUser && <Avatar>{message.sender[0]}</Avatar>}
      <Box sx={{ bgcolor: isUser ? 'lightblue' : 'lightgray', p: 2, borderRadius: '10px', maxWidth: '70%' }}>
        <Typography>{message.content}</Typography>
      </Box>
      {isUser && <Avatar>You</Avatar>}
    </Box>
  );
}

export default Message;
