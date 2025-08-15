"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Capabilities() {
  const capabilities = [
    "Análisis de datos en tiempo real",
    "Predicciones de ventas",
    "Segmentación de clientes",
    "Optimización de inventario",
    "Reportes personalizados",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Capacidades de la IA</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-2 text-sm">
          {capabilities.map((cap, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{cap}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
