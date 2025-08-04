import { PrismaClient, type Client } from "@prisma/client";
import { CustomError } from "../../../error/customError.js";
import { type UpdateClientDto } from "../schemas/schema.js";

export class ClientService {
  constructor(private readonly prisma: PrismaClient) {}

  private async findUserId(id: string): Promise<Client> {
    const user = await this.prisma.client.findUnique({ where: { id } });
    if (!user) throw new CustomError("Usuario no encontrado", 404);
    return user;
  }

  private async getByEmail(email: string): Promise<Client | null> {
    return await this.prisma.client.findFirst({ where: { email } });
  }

  public async getUsersService(): Promise<Client[]> {
    try {
      return await this.prisma.client.findMany();
    } catch {
      throw new CustomError("Error al obtener los usuarios", 500);
    }
  }

  public async createClient(data: {
    name: string;
    email?: string | null;
    phone: string;
    assignedToId?: string | null;
  }): Promise<Client> {
    if (data.email) {
      const existing = await this.getByEmail(data.email);
      if (existing) {
        throw new CustomError("El email ya está en uso", 409);
      }
    }

    try {
      return await this.prisma.client.create({
        data: {
          name: data.name,
          email: data.email ?? null,
          phone: data.phone,
          assignedToId: data.assignedToId ?? null,
        },
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        throw new CustomError("El email ya está en uso", 409);
      }
      throw new CustomError("Error al crear el cliente", 500);
    }
  }

  public async getUserByIdService(id: string): Promise<Client> {
    return await this.findUserId(id);
  }

  public async deleteClient(id: string): Promise<void> {
    await this.findUserId(id); // ya lanza error si no existe
    await this.prisma.client.delete({ where: { id } });
  }

  public async updateDataClient(id: string, data: UpdateClientDto): Promise<Client> {
    await this.findUserId(id);

    try {
      return await this.prisma.client.update({
        where: { id },
        data: {
          ...(data.name !== undefined && { name: data.name }),
          ...(data.email !== undefined && { email: data.email }),
          ...(data.phone !== undefined && { phone: data.phone }),
          ...(data.assignedToId !== undefined && { assignedToId: data.assignedToId }),
          updatedAt: new Date(),
        },
      });
    } catch {
      throw new CustomError("Error al actualizar los datos del cliente", 500);
    }
  }

  
}
