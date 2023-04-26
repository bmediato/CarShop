import { NextFunction, Request, Response } from 'express';
import HttpException from '../Utils/HttpException';

class ErrorMiddleware {
  public static handle(
    error: Error & HttpException,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status(error.status || 500).json({ message: error.message });
    next();
  }
}

export default ErrorMiddleware;