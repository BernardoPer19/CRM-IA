"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bot, Lightbulb } from "lucide-react";
import { Chat } from "./Chat/ChatBot";
import { Capabilities } from "./Chat/Capabilities";
import { useMessages } from "@/hooks/useMessage";
import { SuggestedQuestions } from "./Chat/SuggestedQuestions";

export default function AiAssistantPage() {
  const { messages, isLoading } = useMessages();

  // Estado compartido del input
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Bot className="mr-3 h-8 w-8" />
            IA Asistente
          </h1>
          <p className="text-muted-foreground">
            Tu asistente inteligente con acceso completo a los datos del CRM
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center">
          <Lightbulb className="mr-1 h-3 w-3" />
          Conectado a tu base de datos
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {!isLoading ? (
          // Pasamos inputValue y setInputValue al Chat
          <Chat messages={messages} inputValue={inputValue} setInputValue={setInputValue} />
        ) : (
          <p>Cargando mensajes...</p>
        )}

        <div className="space-y-4">
          {/* Pasamos setInputValue a SuggestedQuestions */}
          <SuggestedQuestions setInputValue={setInputValue} />
          <Capabilities />
        </div>
      </div>
    </div>
  );
}
