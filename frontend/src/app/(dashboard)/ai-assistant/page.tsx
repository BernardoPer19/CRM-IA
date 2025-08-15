"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bot, Lightbulb } from "lucide-react";
import { Chat } from "./Chat/ChatBot";
import { SuggestedQuestions } from "./Chat/SuggestedQuestions";
import { Capabilities } from "./Chat/Capabilities";
import { useMessages } from "@/hooks/useMessage";
import { useAuth } from "@/hooks/useAuth";

export default function AiAssistantPage() {
  const [messagess, setMessages] = useState([
    {
      id: 1,
      content:
        "¡Hola! Soy tu asistente de IA especializado en datos de CRM. Tengo acceso completo a toda la información de tu negocio: clientes, empleados, productos, ventas y más. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const {messages} = useMessages()
  const {getUserProfile} = useAuth()
  console.log(messages);
  console.log(getUserProfile);
  
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
        <Chat messages={messages} setMessages={setMessages} />
        <div className="space-y-4">
          <SuggestedQuestions setMessages={setMessages} messages={messages} />
          <Capabilities />
        </div>
      </div>
    </div>
  );
}
