import { Model } from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Rota /motorcycle', function () {
  const motoInput: IMotorcycle = {
    id: '1',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const newMoto: Motorcycle = new Motorcycle(motoInput);
  const service = new MotorcycleService();

  it('Cadastrando uma moto com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(newMoto);

    const result = await service.createMotorcycle(motoInput);

    expect(result).to.be.deep.equal(newMoto);
  });
  it('Retorna lista completa de motos com sucesso', async function () {
    sinon.stub(Model, 'find').resolves([newMoto]);

    const result = await service.getAll();
    expect(result).to.be.deep.equal([newMoto]);
  });
});