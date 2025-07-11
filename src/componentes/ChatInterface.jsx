import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Bot } from 'lucide-react';

import useWebSocket from 'react-use-websocket';


export const ChatInterface = () => {

  const myid = useRef(Math.floor(Math.random() * 100000));
  const websocketurl = `ws://localhost:8000/ws/${myid.current}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    websocketurl,
    {
      onOpen: () => console.log('Conexión establecida'),
      shouldReconnect: (closeEvent) => true, // Reconexión automática
      reconnectInterval: 3000,
    }
  );

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (lastMessage !== null) {
      let parsed_lastMesssage = JSON.parse(lastMessage.data)

      if(typeof parsed_lastMesssage.timestamp === "string"){
        parsed_lastMesssage.timestamp = new Date(parsed_lastMesssage.timestamp)
      }
      console.log("algo paso aqui")

      setMessages((prev) => [...prev, parsed_lastMesssage]);
    }
  }, [lastMessage]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response
      // const botMessage = {
      //   id: (Date.now() + 1).toString(),
      //   text: "loool",
      //   isBot: true,
      //   timestamp: new Date(),
      // };

      // setMessages(prev => [...prev, botMessage]);
      sendMessage(JSON.stringify(userMessage));
      setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Header - Compact for sidebar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <Bot size={16} />
        </div>
        <div>
          <h1 className="font-semibold text-sm">AI Assistant</h1>
          <p className="text-blue-100 text-xs">Online • Ready to help</p>
        </div>
      </div>

      {/* Messages Container - Scrollable */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 min-h-0">
        {console.log(messages)}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot size={12} className="text-blue-600" />
            </div>
            <div className="bg-white p-2 rounded-2xl shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="p-3 bg-white border-t border-gray-200 flex-shrink-0">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};