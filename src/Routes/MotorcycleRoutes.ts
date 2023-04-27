import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motoRoutes = Router();

motoRoutes.post('/', (req, res, next) => new MotorcycleController(req, res, next).create());
motoRoutes.get('/', (req, res, next) => new MotorcycleController(req, res, next).getAll());
motoRoutes.get('/:id', (req, res, next) => new MotorcycleController(req, res, next).getById());

export default motoRoutes;