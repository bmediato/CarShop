import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import HttpException from '../Utils/HttpException';

class CarService {
  private messageId: string;
  private messageCar: string;
  constructor() {
    this.messageId = 'Invalid mongo id';
    this.messageCar = 'Car not found';
  }
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carModel = new CarODM();
    const newCar = await carModel.create(car);
    return this.createCarDomain(newCar); 
  }

  public async getAll() {
    const carModel = new CarODM();
    const carList = await carModel.findAll();
    const carArray = carList.map((car) => this.createCarDomain(car));
    return carArray;
  }

  public async getById(id: string) {
    const carModel = new CarODM();
    if (!isValidObjectId(id)) throw new HttpException(422, this.messageId);
    const car = await carModel.findById(id);
    if (!car) throw new HttpException(404, this.messageCar);
    return this.createCarDomain(car);
  }
  // validação do Id no mongoose https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.isValidObjectId() 

  public async updateCar(id:string, car:ICar) {
    const carModel = new CarODM();
    if (!isValidObjectId(id)) throw new HttpException(422, this.messageId);
    const findCar = await carModel.findById(id);
    if (findCar) {
      const upDCar = await carModel.update(id, car);
      return this.createCarDomain(upDCar);
    }
    throw new HttpException(404, this.messageCar);
  }

  public async deleteCar(id: string) {
    const carModel = new CarODM();
    if (!isValidObjectId(id)) throw new HttpException(422, this.messageId);
    const findCar = await carModel.findById(id);
    if (findCar) {
      const deleteCar = await carModel.delete(id);
      return this.createCarDomain(deleteCar);
    }
    throw new HttpException(404, this.messageCar);
  }
}

export default CarService;