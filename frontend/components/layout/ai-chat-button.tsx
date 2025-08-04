"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const mockMessages = [
  {
    id: 1,
    content:
      "¡Hola! Soy tu asistente de IA. Puedo ayudarte con información sobre clientes, productos, empleados y más. ¿En qué puedo ayudarte?",
    isBot: true,
    timestamp: new Date(),
  },
];

export function AiChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        content:
          "Entiendo tu consulta. Basándome en los datos del CRM, puedo proporcionarte información detallada. ¿Podrías ser más específico sobre qué información necesitas?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96">
          <Card className="shadow-lg border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>IA Asistente</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-64 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex space-x-2",
                        message.isBot ? "justify-start" : "justify-end"
                      )}
                    >
                      {message.isBot && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-accent text-accent-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "max-w-[70%] rounded-lg px-3 py-2 text-sm",
                          message.isBot
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary text-primary-foreground"
                        )}
                      >
                        {message.content}
                      </div>
                      {!message.isBot && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex space-x-2">
                <Input
                  placeholder="Escribe tu pregunta..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
}
