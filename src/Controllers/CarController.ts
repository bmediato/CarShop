import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.createCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const listCar = await this.service.getAll();
    return this.res.status(200).json(listCar);
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getById(id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateCar() {
    const { id } = this.req.params;
    const car: ICar = {
      ...this.req.body,
    };
    try {
      const update = await this.service.updateCar(id, car);
      return this.res.status(200).json(update);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteCar() {
    const { id } = this.req.params;
    try {
      await this.service.deleteCar(id);

      return this.res.status(204).end();
    } catch (error) {
      return this.next(error);
    }
  }
}

export default CarController;