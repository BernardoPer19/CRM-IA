"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { useMessages } from "@/hooks/useMessage";
import { MessageType } from "@/types/MessagesType";
import { useAuthStore } from "@/store/AuthStore";
import { Emisor } from "../../../../types/Enum/MessageEnum";

interface ChatProps {
  messages: MessageType[];
  inputValue: string;
  setInputValue: (value: string) => void;
}

export function Chat({ messages, inputValue, setInputValue }: ChatProps) {
  const { sendMessage } = useMessages();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const user = useAuthStore((state) => state.user);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    sendMessage({
      contenido: inputValue,
      emisor: user?.role,
    });

    setInputValue("");
  };


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages?.length]);

  return (
    <Card className="lg:col-span-3 h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span>Chat con IA</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 pr-4 mb-4 max-h-full" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex space-x-3",
                  message.emisor === "IA" ? "justify-start" : "justify-end"
                )}
              >
                {message.emisor === "IA" && (
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-3",
                    message.emisor === "IA"
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.contenido}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {new Date(message.createdAt).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.emisor !== "IA" && (
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        <div className="flex space-x-2 pt-4 border-t">
          <Input
            placeholder="Hazme cualquier pregunta sobre tus datos..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
