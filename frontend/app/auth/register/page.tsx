
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard } from "lucide-react";
import RegisterForm from "@/components/forms/register/RegisterForm";
import ButtonsLogin from "@/components/forms/register/ButtonsLogin";

export default function RegisterPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold">ModernCRM</span>
          </div>
          <div>
            <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
            <CardDescription>
              Únete y comienza a gestionar tu negocio hoy
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Botones login social */}
          <ButtonsLogin />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O registrarse con email
              </span>
            </div>
          </div>

          <RegisterForm />

          <div className="text-center text-sm">
            <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
