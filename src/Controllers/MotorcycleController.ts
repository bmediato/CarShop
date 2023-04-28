import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      ...this.req.body,
    };
    try {
      const newMoto = await this.service.createMotorcycle(motorcycle);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const listMoto = await this.service.getAll();
    return this.res.status(200).json(listMoto);
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const moto = await this.service.getById(id);
      return this.res.status(200).json(moto);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateMoto() {
    const { id } = this.req.params;
    const moto: IMotorcycle = {
      ...this.req.body,
    };
    try {
      const update = await this.service.updateMoto(id, moto);
      return this.res.status(200).json(update);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteMotorcycle() {
    const { id } = this.req.params;
    try {
      await this.service.deleteMoto(id);

      return this.res.status(204).end();
    } catch (error) {
      return this.next(error);
    }
  }
}

export default MotorcycleController;