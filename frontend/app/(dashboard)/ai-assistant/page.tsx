"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Lightbulb, TrendingUp, Users, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestedQuestions = [
  {
    category: "Clientes",
    icon: Users,
    questions: [
      "¿Cuáles son mis 5 mejores clientes por volumen de compras?",
      "¿Qué clientes no han comprado en los últimos 30 días?",
      "¿Cuál es la distribución geográfica de mis clientes?",
    ],
  },
  {
    category: "Productos",
    icon: Package,
    questions: [
      "¿Qué productos tienen el stock más bajo?",
      "¿Cuáles son los productos más vendidos este mes?",
      "¿Qué categorías generan más ingresos?",
    ],
  },
  {
    category: "Análisis",
    icon: TrendingUp,
    questions: [
      "¿Cómo han evolucionado las ventas en los últimos 6 meses?",
      "¿Cuál es el rendimiento del equipo de ventas?",
      "¿Qué tendencias veo en el comportamiento de compra?",
    ],
  },
];

const mockMessages = [
  {
    id: 1,
    content:
      "¡Hola! Soy tu asistente de IA especializado en datos de CRM. Tengo acceso completo a toda la información de tu negocio: clientes, empleados, productos, ventas y más. ¿En qué puedo ayudarte hoy?",
    isBot: true,
    timestamp: new Date(),
  },
];

export default function AiAssistantPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputValue;
    if (!messageToSend.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      content: messageToSend,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        content: `Perfecto, estoy analizando tu consulta: "${messageToSend}". Basándome en los datos actuales de tu CRM, puedo proporcionarte información detallada. Por ejemplo, si me preguntas sobre clientes, tengo acceso a 124 registros con datos de contacto, historial de compras, empleados asignados y más. ¿Te gustaría que profundice en algún aspecto específico?`,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

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
        {/* Chat Interface */}
        <Card className="lg:col-span-3 h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>Chat con IA</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
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
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString("es-ES", {
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
                ))}
              </div>
            </ScrollArea>
            <div className="flex space-x-2 pt-4 border-t">
              <Input
                placeholder="Hazme cualquier pregunta sobre tus datos..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preguntas Sugeridas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedQuestions.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center space-x-2 mb-2">
                    <category.icon className="h-4 w-4" />
                    <span className="font-medium text-sm">
                      {category.category}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {category.questions.map((question, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full text-left h-auto p-2 text-xs leading-relaxed"
                        onClick={() => handleSendMessage(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capacidades de la IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Análisis de datos en tiempo real</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Predicciones de ventas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Segmentación de clientes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Optimización de inventario</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Reportes personalizados</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
