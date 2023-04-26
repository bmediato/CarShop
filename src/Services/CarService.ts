import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
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
}

export default CarService;