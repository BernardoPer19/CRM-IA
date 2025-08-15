"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, ImageIcon, Phone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { RegisterTypeSchema, RegisterSchema } from "@/components/forms/schemas/RegisterSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterTypeSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterTypeSchema) => {
    registerUser.mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nombre */}
        <div className="space-y-1">
          <Label htmlFor="name">Nombre</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Nombre"
              {...register("name")}
              className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Apellido */}
        <div className="space-y-1">
          <Label htmlFor="lastname">Apellido</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lastname"
              type="text"
              placeholder="Apellido"
              {...register("lastName")}
              className={`pl-10 ${errors.lastName ? "border-destructive" : ""}`}
            />
          </div>
          {errors.lastName && (
            <p className="text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div className="space-y-1">
          <Label htmlFor="phone">Teléfono</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="Ej. +591 70000000"
              {...register("phone")}
              className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Imagen */}
        <div className="space-y-1">
          <Label htmlFor="img">Imagen URL - (Opcional)</Label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="img"
              type="url"
              placeholder="URL de imagen"
              {...register("img")}
              className={`pl-10 ${errors.img ? "border-destructive" : ""}`}
            />
          </div>
          {errors.img && (
            <p className="text-sm text-destructive">{errors.img.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email")}
              className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1 relative">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              {...register("password")}
              className={`pl-10 pr-10 ${
                errors.password ? "border-destructive" : ""
              }`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit (columna completa) */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            className="w-full"
            disabled={registerUser.isPending}
          >
            {registerUser.isPending ? "Registrando..." : "Crear Cuenta"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
