import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    res.status(422).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  } else {
    next();
  }

};
