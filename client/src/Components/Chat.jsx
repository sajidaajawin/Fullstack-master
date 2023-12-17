import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages([...messages, { text: newMessage, sender: 'admin' }]);
    setNewMessage('');
  };

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              marginBottom: '8px',
              background: message.sender === 'admin' ? '#C08261' : '#ddd',
              color: message.sender === 'admin' ? 'white' : 'black',
              borderRadius: '8px',
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
