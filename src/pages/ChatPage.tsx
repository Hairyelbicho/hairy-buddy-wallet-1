
import { useState, useRef, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageData {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: "welcome",
      content: "Hi there! I'm Hairy IA, your personal cryptocurrency assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: MessageData = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response after a small delay
    setTimeout(() => {
      const botResponses = [
        "I'm analyzing current market trends for $HBT. It looks positive today!",
        "Based on your portfolio, I recommend holding your $HBT tokens for now.",
        "The animal shelter supported by your recent transaction helped 5 cats find new homes this week!",
        "Did you know that $HBT has donated over $10,000 to animal shelters in the past month?",
        "I can help you set up automatic donations to your favorite animal shelter."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const aiMessage: MessageData = {
        id: Date.now().toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center border-b border-gray-200 z-10">
        <h1 className="text-xl font-bold">Hairy IA</h1>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-500">Online</span>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            content={msg.content}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me anything about crypto or animals..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button 
            className="bg-hairy-primary hover:bg-hairy-secondary"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default ChatPage;
