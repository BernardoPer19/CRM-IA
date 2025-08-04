import type { Request, Response } from "express";
import type { ClientService } from "../services/clientService.js";
import { catchAsync } from "../../../middlewares/catchAsync.js";
import { CustomError } from "../../../error/customError.js";
import { validateCreateClient } from "../schemas/createShemaPOst.js";
import { validateUpdates } from "../schemas/schema.js";


export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  public getAllClients = catchAsync(async (_req: Request, res: Response) => {
    const clients = await this.clientService.getUsersService();
    res.json(clients);
  });



  public getClientById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new CustomError("ID del cliente no proporcionado", 400);
    }

    const client = await this.clientService.getUserByIdService(id);
    if (!client) {
      throw new CustomError("Cliente no encontrado", 404);
    }

    res.json(client);
  });


  public createClient = catchAsync(async (req: Request, res: Response) => {
    const validatedData = validateCreateClient(req.body);

    // Convertimos undefined a null explícitamente, que Prisma sí acepta
    const clientData = {
      ...validatedData,
      assignedToId: validatedData.assignedToId ?? null,
      email: validatedData.email ?? null,
    };

    const newClient = await this.clientService.createClient(clientData);
    res.status(201).json(newClient);
  });


  public deleteClient = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new CustomError("ID del cliente no proporcionado", 400);
    }

    await this.clientService.deleteClient(id);
    res.status(204).send();
  });



  public updateClient = catchAsync(async (req: Request, res: Response) => {
    const validatedData = validateUpdates(req.body);
    const id = req.params.id;

    if (!id) {
      throw new CustomError("ID del cliente no proporcionado", 400);
    }

    // Limpiar datos: undefined para string opcionales, null solo para nullable como assignedToId
    const cleanedData = {
      name: validatedData.name ?? undefined,
      email: validatedData.email ?? undefined,
      phone: validatedData.phone ?? undefined,
      assignedToId: validatedData.assignedToId ?? null, // Prisma espera null si no se asigna
      state: validatedData.state ?? undefined,
    };

    const client = await this.clientService.updateDataClient(id, cleanedData);
    res.json(client);
  });

}
