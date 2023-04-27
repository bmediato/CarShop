import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motoRoutes = Router();

motoRoutes.post('/', (req, res, next) => new MotorcycleController(req, res, next).create());

export default motoRoutes;