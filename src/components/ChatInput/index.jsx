import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <Box sx={{ display: 'flex', p: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
