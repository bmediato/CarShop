import { Router } from 'express';
import carRoutes from './CarRoutes';
import motoRoutes from './MotorcycleRoutes';

const router = Router();

router.use('/cars', carRoutes);
router.use('/motorcycles', motoRoutes);

export default router;