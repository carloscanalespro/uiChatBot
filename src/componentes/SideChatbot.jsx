import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { ChatButton } from './ChatButton';

export const SideChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Side Chat Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {isOpen && <ChatInterface />}
      </div>
      
      {/* Chat Button positioned relative to the chat panel */}
      <div className={`fixed top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out z-50 ${
        isOpen ? 'right-96' : 'right-0'
      }`}>
        <ChatButton isOpen={isOpen} onClick={toggleChat} />
      </div>
    </>
  );
};