import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

describe('Rota /cars', function () {
  const carInput: ICar = {
    id: '1',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  };

  const newCar: Car = new Car(carInput);

  it('Cadastrando um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(newCar);

    const service = new CarService();
    const result = await service.createCar(carInput);

    expect(result).to.be.deep.equal(newCar);
  });

  it('Retorna lista completa de carros com sucesso', async function () {
    sinon.stub(Model, 'find').resolves([newCar]);

    const service = new CarService();
    const result = await service.getAll();
    expect(result).to.be.deep.equal([newCar]);
  });
  it('Retorna com sucesso apenas o carro com id presente na URL', async function () {
    sinon.stub(Model, 'findById').resolves(newCar);

    const service = new CarService();
    const result = await service.getById('1');
    expect(result).to.be.deep.equal(newCar);
  });
  it('Retorna erro caso id passado não exista no banco', async function () {
    sinon.stub(Model, 'findById');
  });
  afterEach(function () {
    sinon.restore();
  });
});   
