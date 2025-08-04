import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <BarChart3 className="mr-3 h-8 w-8" />
            Análisis y Reportes
          </h1>
          <p className="text-muted-foreground">
            Análisis detallado del rendimiento de tu negocio
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Último Mes
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Coming Soon */}
      <Card className="text-center py-12">
        <CardContent>
          <TrendingUp className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Análisis Avanzados Próximamente</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Estamos preparando dashboards interactivos con métricas detalladas, 
            gráficos en tiempo real y reportes personalizables para tu negocio.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}