import { getRepository, Like } from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { Order } from '../entity/Order';
import { OrderDetails } from '../entity/OrderDetails';

class OrdersController {

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await getRepository(Order).find({
        relations: ['user', 'orderDetails', 'orderDetails.product']
      });
      return res.status(200).json(orders);

    } catch (error) {
      console.log(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log('HELLO');

    const orderedProducts = req.body;
    console.log(req.body);
    try {
      let order = new Order();
      order.user = req.user;
      order = await order.save();
      order.orderDetails = [];
      for (const product of orderedProducts) {
        let orderLine = new OrderDetails();
        orderLine.product = product;
        orderLine.orderedQuantity = product.orderedQuantity;
        orderLine.order = order;
        orderLine.save();
      }
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = Number(req.params.id);

      const order = await getRepository(Order).findOne(orderId);
      order.status = req.body.status;
      await order.save();
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }
  }

}

export default new OrdersController();