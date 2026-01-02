
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, Sparkles } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Namaste! I'm KiranaConnect AI. 👋 Ask me about store comparisons or seasonal deals!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: response || "Something went wrong." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "AI is currently offline." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
      {isOpen ? (
        <div className="w-[calc(100vw-3rem)] sm:w-96 h-[550px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-300 origin-bottom-right">
          <div className="bg-[#0F172A] p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3 text-white">
              <div className="bg-orange-500 p-2 rounded-2xl">
                <Bot className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <span className="font-black block leading-none">Kirana AI</span>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-5 bg-slate-50 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] font-medium leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-orange-500 text-slate-900 rounded-br-none' 
                    : 'bg-[#0F172A] text-white rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#0F172A] p-4 rounded-3xl rounded-bl-none text-white">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 border-t border-slate-100 bg-white flex items-center space-x-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-grow bg-slate-100 border-none focus:ring-2 focus:ring-orange-500 rounded-2xl py-4 px-5 text-sm font-medium"
            />
            <button 
              onClick={handleSend}
              className="bg-[#0F172A] text-orange-500 p-4 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center group shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#0F172A] text-orange-500 p-5 rounded-[2rem] shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center border-2 border-orange-500/20"
        >
          <Sparkles className="w-6 h-6 mr-2" />
          <span className="font-black uppercase tracking-widest text-[10px]">Kirana AI</span>
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;
