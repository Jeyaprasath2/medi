import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Plus, User, Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);

  useEffect(() => {
    if (isAiResponding) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, { text: `AI response to: ${input}`, sender: 'ai' }]);
        setIsAiResponding(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAiResponding, input]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      setIsAiResponding(true);
      setInput('');
    }
  };

  const handleInsertAI = () => {
    if (aiResponse.trim()) {
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
      setAiResponse('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="mr-2 text-blue-500" />
            AI Chatbot
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert AI Response</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <Input
                  value={aiResponse}
                  onChange={(e) => setAiResponse(e.target.value)}
                  placeholder="Enter AI response..."
                />
                <Button onClick={handleInsertAI}>Insert</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-0">
        <ScrollArea className="flex-grow p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`rounded-full p-2 ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-300'} mr-2`}>
                  {message.sender === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-gray-700" />}
                </div>
                <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'}`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          {isAiResponding && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start max-w-[80%]">
                <div className="rounded-full p-2 bg-gray-300 mr-2">
                  <Bot className="h-4 w-4 text-gray-700" />
                </div>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                  AI is typing...
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow"
            />
            <Button onClick={handleSend}>
              <Send size={20} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;