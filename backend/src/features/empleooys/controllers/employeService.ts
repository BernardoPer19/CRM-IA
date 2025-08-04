import type { Request, Response } from "express";
import { catchAsync } from "../../../middlewares/catchAsync.js";
import { EmplooyService } from "../services/clientService.js";
import { CustomError } from "../../../error/customError.js";
import { validateUpdates } from "../schemas/emplooySchema.js";

export class EmployeeController {
  constructor(private readonly clientService: EmplooyService) { }

  public getAllEmployees = catchAsync(async (_req: Request, res: Response) => {
    const clients = await this.clientService.getEmployeesService();
    const size = clients.length
    res.json({
      size,
      clients,
    });
  });



  public getEmployeesById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new CustomError("ID del empleado no proporcionado", 400);
    }

    const client = await this.clientService.getUserByIdService(id);
    if (!client) {
      throw new CustomError("empleado no encontrado", 404);
    }

    res.json(client);
  });


  public deleteEmployees = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new CustomError("ID del empleado no proporcionado", 400);
    }

    await this.clientService.deleteEmployees(id);
    res.status(204).send();
  });



  public updateEmployees = catchAsync(async (req: Request, res: Response) => {
    const validatedData = validateUpdates(req.body);

    const id = req.params.id;
    if (!id) {
      throw new CustomError("ID del empleado no proporcionado", 400);
    }

    const client = await this.clientService.updateDataEmployees(id, validatedData);
    res.json(client);
  });
}
