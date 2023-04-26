import express from 'express';
import carRoutes from './Routes/CarRoutes';
import ErrorMiddleware from './Middlewares/Error';

const app = express();

app.use(express.json());
app.use('/cars', carRoutes);
app.use(ErrorMiddleware.handle);

export default app;
