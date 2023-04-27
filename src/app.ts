import express from 'express';
import ErrorMiddleware from './Middlewares/Error';
import router from './Routes';

const app = express();

app.use(express.json());
app.use(router);
app.use(ErrorMiddleware.handle);

export default app;
