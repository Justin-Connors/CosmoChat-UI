import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const ChatWindow = ({ messages }) => {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatWindow;
