import React from 'react';
import { Box } from '@mui/material';
import Message from '../Message';

function ChatBody({ messages }) {
  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
      {messages.map(msg => (
        <Message key={msg.id} message={msg} />
      ))}
    </Box>
  );
}

export default ChatBody;
