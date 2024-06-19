import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import Activity from './components/Activity';
import Layout from './Layout';

function App() {
    const [activeChats, setActiveChats] = React.useState([]);
    const [endedChats, setEndedChats] = React.useState([]);
  return (
    <Routes>
      <Route path="/" element={<Layout><Welcome /></Layout>} />
      <Route path="/chat-list" element={
        <Layout>
            <ChatList activeChats={activeChats} 
                      setActiveChats={setActiveChats} 
                      endedChats={endedChats} 
                      setEndedChats={setEndedChats} 
            />
        </Layout>}/>
      <Route path="/chat" element={
        <Layout>
            <Chat activeChats={activeChats} 
                  setActiveChats={setActiveChats} 
                  endedChats={endedChats} 
                  setEndedChats={setEndedChats} 
            />
        </Layout>} /> 
      <Route path="/activity" element={<Layout><Activity /></Layout>} />
    </Routes>
  );
}

export default App;
