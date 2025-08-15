import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  UserCheck, 
  Package, 
  TrendingUp, 
  Bot,
  Send,
  BarChart3,
  DollarSign
} from 'lucide-react';

const stats = [
  {
    title: 'Total Clientes',
    value: '124',
    change: '+12%',
    icon: Users,
    color: 'text-blue-600',
  },
  {
    title: 'Empleados Activos',
    value: '12',
    change: '+2',
    icon: UserCheck,
    color: 'text-green-600',
  },
  {
    title: 'Productos',
    value: '89',
    change: '+5%',
    icon: Package,
    color: 'text-purple-600',
  },
  {
    title: 'Ingresos del Mes',
    value: '$45,231',
    change: '+18%',
    icon: DollarSign,
    color: 'text-emerald-600',
  },
];

const recentActivity = [
  {
    id: 1,
    action: 'Nuevo cliente registrado',
    user: 'María González',
    time: 'Hace 2 minutos',
    type: 'client',
  },
  {
    id: 2,
    action: 'Producto actualizado',
    user: 'Juan Pérez',
    time: 'Hace 15 minutos',
    type: 'product',
  },
  {
    id: 3,
    action: 'Empleado asignado',
    user: 'Ana López',
    time: 'Hace 1 hora',
    type: 'employee',
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido de nuevo, Juan. Aquí tienes un resumen de tu negocio.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Ver Reportes
          </Button>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            Analizar Tendencias
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Assistant Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>IA Asistente Integrada</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <p className="text-sm">
                    <strong>Análisis Automático:</strong> Basándome en tus datos, he identificado que tus ventas han aumentado un 18% este mes. María González es tu cliente más activo con 5 compras recientes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">🔍 Insight Automático</Badge>
                    <Badge variant="outline">📈 Tendencia Positiva</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Preguntas sugeridas:</h4>
              <div className="grid gap-2">
                <Button variant="outline" className="justify-start h-auto p-3 text-left">
                  <div>
                    <div className="font-medium">¿Cuáles son mis 5 mejores clientes?</div>
                    <div className="text-xs text-muted-foreground">Análisis de clientes por volumen de compras</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-3 text-left">
                  <div>
                    <div className="font-medium">¿Qué productos necesitan más stock?</div>
                    <div className="text-xs text-muted-foreground">Inventario y predicciones</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-3 text-left">
                  <div>
                    <div className="font-medium">¿Cómo va el rendimiento del equipo?</div>
                    <div className="text-xs text-muted-foreground">Métricas de empleados y productividad</div>
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex space-x-2 pt-2 border-t">
              <input
                placeholder="Hazme una pregunta sobre tus datos..."
                className="flex-1 px-3 py-2 text-sm border rounded-md bg-background"
              />
              <Button size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        por {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}