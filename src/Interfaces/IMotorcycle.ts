import IVehicle from './IVehicle';

interface IMotorcycle extends IVehicle{
  category: 'Custom' | 'Street' | 'Trail',
  engineCapacity: number,
}

export default IMotorcycle;