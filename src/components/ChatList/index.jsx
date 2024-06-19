import * as React from 'react';
import { List, ListItemText, Button, Typography, ListItemButton, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteChatModal from '../DeleteChatModal';

export default function ChatListScreen({ activeChats, setActiveChats, endedChats, setEndedChats }) {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [chatToDelete, setChatToDelete] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem('chats', JSON.stringify([...activeChats, ...endedChats]));
  }, [activeChats, endedChats]);

  const handleOpenChat = (chatId) => {
    const chatExists = [...activeChats, ...endedChats].some(chat => chat.id === chatId);

    if (chatExists && (!chatToDelete || chatId !== chatToDelete.id)) {
      navigate('/chat', { state: { chatId } });
    }
  };

  const handleNewChat = () => {
    const newChatId = Math.random().toString(36).substr(2, 9); // Generate random ID
    const newChat = { id: newChatId, title: `Chat with AI ${newChatId}`, ended: false };

    setActiveChats(prevChats => {
      const updatedChats = [newChat, ...prevChats];
      localStorage.setItem('chats', JSON.stringify(updatedChats));
      return updatedChats;
    });
    
    navigate('/chat', { state: { chatId: newChatId } });
  };

  const handleDeleteChat = (chatId) => {
    setActiveChats(prevActiveChats => prevActiveChats.filter(chat => chat.id !== chatId));
    setEndedChats(prevEndedChats => prevEndedChats.filter(chat => chat.id !== chatId));

    localStorage.setItem('chats', JSON.stringify([...activeChats, ...endedChats]));
    setOpenDeleteModal(false);

    if (chatToDelete && chatToDelete.id === chatId) {
      setChatToDelete(null); 
    }
    navigate('/chat-list'); 
  };

  return (
    <div style={{ padding: 20 }}>
      <Button 
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleNewChat}
        sx={{ marginBottom: 2 }}
      >
        New Chat
      </Button>
      
      <Typography variant="h6" gutterBottom>
        Active Chats
      </Typography>
      <List>
        {activeChats.map((chat) => (
          <ListItemButton key={chat.id} onClick={() => handleOpenChat(chat.id)}>
            <ListItemText primary={chat.title} />
          </ListItemButton>
        ))}
      </List>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Ended Chats
      </Typography>
      <List>
        {endedChats.map((chat) => (
          <ListItem key={chat.id} onClick={() => handleOpenChat(chat.id)}>
            <ListItemText primary={chat.title} />
            <Button
              onClick={(event) => {
                event.stopPropagation();
                setChatToDelete(chat);
                setOpenDeleteModal(true);
              }}
            >
              Delete
            </Button>
            <DeleteChatModal
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              onDelete={() => handleDeleteChat(chatToDelete ? chatToDelete.id : null)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
