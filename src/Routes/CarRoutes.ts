import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.post('/', (req, res, next) => new CarController(req, res, next).create());
carRoutes.get('/', (req, res, next) => new CarController(req, res, next).getAll());
carRoutes.get('/:id', (req, res, next) => new CarController(req, res, next).getById());
carRoutes.put('/:id', (req, res, next) => new CarController(req, res, next).updateCar());
carRoutes.delete('/:id', (req, res, next) => new CarController(req, res, next).deleteCar());

export default carRoutes;