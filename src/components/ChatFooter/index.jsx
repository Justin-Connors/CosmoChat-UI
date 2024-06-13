import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ChatFooter({ onSendMessage }) {
  const [messageText, setMessageText] = useState('');

  return (
    <Box sx={{ p: 2, display: 'flex' }}>
      <TextField
        sx={{ flexGrow: 1, mr: 2 }}
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
        placeholder="Type a message..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => onSendMessage(messageText)}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
}

export default ChatFooter;
