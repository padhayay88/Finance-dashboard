import React, { useState } from 'react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Welcome to the AI Assistant. How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message to the chat
    const userMessage = { sender: 'User', text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    const aiResponse = { sender: 'AI', text: `You said: "${input}". How else can I help?` };
    setMessages((prev) => [...prev, aiResponse]);

    // Clear input field
    setInput('');
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>
      <div className="flex-grow overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === 'AI' ? 'bg-blue-100 text-blue-900' : 'bg-gray-300 text-gray-900'
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-lg p-2 mr-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}