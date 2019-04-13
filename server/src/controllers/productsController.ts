import {getRepository, In} from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { Product } from '../entity/Product';
import { Category } from '../entity/Category';

class productsController {

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const query = getRepository(Product)
        .createQueryBuilder('products')
        .leftJoinAndSelect('products.categories', 'categories');

      if (req.query.filter) {
        let { filter } = req.query;
        query.where('categories.name = :name', { name: filter })
      }
      const products = await query.getMany();
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    let product = new Product();
    product = req.body;
    product.categories = req.body.categories;
    if (!product.imageUrl.startsWith('http') && !product.imageUrl.startsWith('https')) {
      product.imageUrl = 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png';
    }

    try {
      product = await getRepository(Product).save(product);

      return res.status(201).json(product);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsInCart(req: Request, res: Response, next: NextFunction) {
    if (!req.query.ids) {
      return res.status(400).json({ 'message': 'params not provided.' });
    }

    let ids = req.query.ids.split(', ');
    try {
      const products = await getRepository(Product).find({
        id: In(ids)
      });
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }

  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await getRepository(Product).findOne({
        where: {id: req.params.id},
        relations: ['comments', 'comments.user']
      });
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }

}

export default new productsController();