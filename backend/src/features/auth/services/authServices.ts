import { PrismaClient } from "@prisma/client";
import type { LoginType, RegisterTypeSchema } from "../schemas/authSchema.js";
import { comparePassword } from '../utils/authUtils.js';

export class AuthServices {
  constructor(private readonly prisma: PrismaClient) { }

  private async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  public async RegisterUser(data: RegisterTypeSchema) {
    const { email, name, lastName, phone, img, role, password } = data;

    console.log("Registro:", { email, name, lastName, phone, img, role, password });

    const existingUser = await this.findUserByEmail(email);
    console.log("existingUser:", existingUser);

    if (existingUser) {
      throw new Error("El usuario ya está registrado con este correo.");
    }

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        lastName,
        phone,
        img: img || null,
        role: role || "EMPLOYEE",
        password,
      },
    });

    return newUser;
  }


  public async LoginValidateService({ email, password }: LoginType) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error("El usuario no está registrado con este correo.");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      name: user.name,
      lastname: user.lastName,
      role: user.role,
    };
  }

  public async getUserProfile(userId: string): Promise<RegisterTypeSchema> {

    if (!userId) throw new Error("User ID is required");


    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        img: true,
        phone: true,
        role: true,
        lastName: true,
        createdAt: true
      },
    });

    if (!user) throw new Error("Usuario no encontrado");

    return {
      name: user.name,
      email: user.email,
      password: "",
      img: user.img ?? undefined,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
    };
  }
}