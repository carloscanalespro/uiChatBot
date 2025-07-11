import React from 'react';
import { MessageCircle, X } from 'lucide-react';

export const ChatButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-16 rounded-l-full shadow-lg transition-all duration-300 flex items-center justify-center ${
        isOpen 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
      } hover:scale-110 group`}
    >
      {isOpen ? (
        <X size={20} className="text-white transition-transform duration-200 group-hover:rotate-90" />
      ) : (
        <MessageCircle size={20} className="text-white transition-transform duration-200 group-hover:scale-110" />
      )}
      
      {/* Pulse animation when closed */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-l-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-ping opacity-20"></div>
      )}
    </button>
  );
};