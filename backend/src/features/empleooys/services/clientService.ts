import { type User, Client, PrismaClient } from "@prisma/client";
import { CustomError } from "../../../error/customError.js";
import type { UpdateEmplooyDto } from "../../../dtos/update-client.dto.js";

export class EmplooyService {
  constructor(private readonly prisma: PrismaClient) { }

  private async findUserId(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new CustomError("Usuario no encontrado", 404);
    }
    return user;
  }

  public async getEmployeesService(): Promise<(User & { clients: Client[] })[]> {
    try {
      return await this.prisma.user.findMany({
        orderBy: {
          role: "asc",
        },
        include: {
          clients: true,
        },
      });
    } catch {
      throw new CustomError("Error al obtener los usuarios", 500);
    }
  }

  public async getUserByIdService(id: string): Promise<User> {
    return await this.findUserId(id);
  }

  public async deleteEmployees(id: string): Promise<void> {
    const user = await this.findUserId(id);
    if (user.role !== "EMPLOYEE") {
      throw new CustomError("No puedes eliminar un usuario que no sea empleado", 403);
    }
    await this.prisma.client.deleteMany({
      where: { assignedToId: id }
    });
    await this.prisma.user.delete({ where: { id } });
  }
  public async updateDataEmployees(
    id: string,
    data: UpdateEmplooyDto
  ): Promise<User> {
    const user = await this.findUserId(id);

    const updateData: Partial<User> = {
      updatedAt: new Date(),
    };

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    // Puedes agregar más campos aquí si los permites actualizar

    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new CustomError("Error al actualizar los datos del empleado", 500);
    }
  }
}
