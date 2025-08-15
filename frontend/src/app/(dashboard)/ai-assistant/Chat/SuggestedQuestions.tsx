"use client";

import { Button } from "@/components/ui/button";
import { Users, Package, TrendingUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

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

interface Props {
  messages: any[];
  setMessages: Dispatch<SetStateAction<any[]>>;
}

export function SuggestedQuestions({ messages, setMessages }: Props) {
  const handleClick = (question: string) => {
    const newMessage = {
      id: messages.length + 1,
      content: question,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="space-y-4 bg-card p-4 rounded-lg border">
      {suggestedQuestions.map((category) => (
        <div key={category.category}>
          <div className="flex items-center space-x-2">
            <category.icon className="h-4 w-4" />
            <span className="font-medium text-sm">{category.category}</span>
          </div>
          <div className="">
            {category.questions.map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full text-left h-auto p-2 text-xs"
                onClick={() => handleClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
