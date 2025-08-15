"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MessageType } from "@/types/MessagesType";

interface MessageItemProps {
  message: MessageType & { isBot?: boolean };
}

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      className={cn(
        "flex space-x-3",
        message.isBot ? "justify-start" : "justify-end"
      )}
    >
      {message.isBot && (
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3",
          message.isBot
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
      {!message.isBot && (
        <Avatar className="h-10 w-10">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
