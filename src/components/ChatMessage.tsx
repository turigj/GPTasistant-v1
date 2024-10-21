import React from 'react';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-start mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`rounded-full p-2 ${isUser ? 'bg-blue-500' : 'bg-gray-300'}`}>
          {isUser ? <User size={20} className="text-white" /> : <Bot size={20} className="text-gray-600" />}
        </div>
        <div className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${isUser ? 'bg-blue-100 ml-2' : 'bg-gray-100 mr-2'}`}>
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;