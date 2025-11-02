'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Minimize2, Maximize2, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatbot({ isOpen, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your codeveda AI assistant. I can help you with infection control protocols, patient queries, treatment guidelines, and data analysis. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Simple rule-based responses for demo
    if (lowerQuery.includes('mdr') || lowerQuery.includes('resistant')) {
      return 'For Multi-Drug Resistant infections, I recommend:\n\n1. **Isolation Protocol**: Implement contact precautions immediately\n2. **Culture Testing**: Ensure sensitivity testing is performed\n3. **Antibiotic Stewardship**: Consult the latest antibiogram data\n4. **PPE Requirements**: Full gown, gloves, and mask for all contact\n\nWould you like specific protocol details or patient management guidelines?';
    }
    
    if (lowerQuery.includes('protocol') || lowerQuery.includes('guideline')) {
      return 'I can help you with various protocols:\n\n• **Isolation Protocols** - Contact, droplet, and airborne precautions\n• **Sterilization Guidelines** - Equipment and environment cleaning\n• **Antibiotic Protocols** - Empirical therapy and de-escalation\n• **PPE Guidelines** - Proper donning and doffing procedures\n\nWhich protocol would you like to review?';
    }
    
    if (lowerQuery.includes('patient') || lowerQuery.includes('case')) {
      return 'For patient case management, I can assist with:\n\n✓ Risk assessment and stratification\n✓ Treatment plan recommendations\n✓ Lab result interpretation\n✓ Contact tracing analysis\n✓ Discharge planning\n\nPlease provide the patient ID or specific details you need help with.';
    }
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return 'Hello! I\'m here to help with your infection control needs. I can assist with protocols, patient management, data analysis, and clinical guidelines. What would you like to know?';
    }
    
    if (lowerQuery.includes('thank')) {
      return 'You\'re welcome! If you have any other questions about infection control, patient management, or protocols, feel free to ask. I\'m here to help! 🏥';
    }

    // Default response
    return `I understand you're asking about "${query}". I can help with:\n\n• Infection control protocols and guidelines\n• MDR case management strategies\n• Patient risk assessment\n• Treatment recommendations\n• Lab result interpretation\n• Contact tracing procedures\n\nCould you provide more specific details so I can give you the most relevant information?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    'What is the isolation protocol for MDR patients?',
    'How do I interpret antibiotic sensitivity reports?',
    'What PPE is required for contact precautions?',
    'Show me the latest sterilization guidelines'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col shadow-2xl rounded-lg overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
      style={{ 
        width: isMinimized ? '320px' : '420px', 
        height: isMinimized ? '60px' : '600px',
        maxHeight: 'calc(100vh - 2rem)'
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white">AI Medical Assistant</h3>
            <p className="text-xs text-teal-100">Always ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="inline-flex items-center justify-center w-8 h-8 text-white hover:bg-white/20 rounded-lg transition-all"
            aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 text-white hover:bg-white/20 rounded-lg transition-all"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-teal-600 dark:bg-teal-700' 
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  )}
                </div>
                <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-teal-600 dark:bg-teal-700 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
                  }`}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1.5 ${
                      message.role === 'user' 
                        ? 'text-teal-100' 
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-slate-200 dark:bg-slate-800">
                  <Bot className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-teal-600 dark:text-teal-500 animate-spin" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (shown when no messages from user yet) */}
          {messages.length === 1 && (
            <div className="border-t border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 2).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about protocols, patients, or guidelines..."
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-600"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="inline-flex items-center justify-center w-10 h-10 bg-teal-600 dark:bg-teal-700 text-white rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </>
      )}
    </div>
  );
}
