import { getRepository, Like } from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { Order } from '../entity/Order';

class OrdersController {

  async get(req: Request, res: Response, next: NextFunction) {

  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log(req);
  }

}

export default new OrdersController();