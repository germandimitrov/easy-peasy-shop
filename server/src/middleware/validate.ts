import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator/check';

const validate = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

export default validate;