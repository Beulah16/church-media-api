import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateRequest(requestDto: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const output = plainToInstance(requestDto, req.body);

    validate(output, { whitelist: true, forbidNonWhitelisted: true }).then(errors => {
      if (errors.length > 0) {
        const messages: Record<string, any> = {};

        for(let error of errors){
          messages[error.property] = Object.values(error.constraints ?? []).join(', ');
        }

        return res.status(400).json({ errors: messages });
      } else {
        req.body = output;
        next();
      }
    });
  };
}
