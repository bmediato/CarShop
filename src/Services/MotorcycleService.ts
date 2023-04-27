import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import HttpException from '../Utils/HttpException';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motoModel = new MotorcycleODM();
    const newMotocycle = await motoModel.create(motorcycle);
    return this.createMotorcycleDomain(newMotocycle);
  }

  public async getAll() {
    const motoModel = new MotorcycleODM();
    const motoList = await motoModel.findAll();
    const motoArray = motoList.map((moto) => this.createMotorcycleDomain(moto));
    return motoArray;
  }

  public async getById(id: string) {
    const motoModel = new MotorcycleODM();
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');
    const moto = await motoModel.findById(id);
    if (!moto) throw new HttpException(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(moto);
  }

  public async updateMoto(id: string, moto:IMotorcycle) {
    const motoModel = new MotorcycleODM();
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');
    const findCar = await motoModel.findById(id);
    if (findCar) {
      const upDCar = await motoModel.update(id, moto);
      return this.createMotorcycleDomain(upDCar);
    }
    throw new HttpException(404, 'Motorcycle not found');
  }
}

export default MotorcycleService;