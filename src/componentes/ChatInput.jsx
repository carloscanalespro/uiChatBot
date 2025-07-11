
import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          className="pr-20 py-3 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 hover:bg-gray-100 rounded-full"
          >
            <Paperclip size={16} className="text-gray-500" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 hover:bg-gray-100 rounded-full"
          >
            <Smile size={16} className="text-gray-500" />
          </Button>
        </div>
      </div>
      
      <Button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-200 hover:scale-105"
      >
        <Send size={18} />
      </Button>
    </div>
  );
};
