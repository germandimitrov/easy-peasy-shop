import {getRepository, In} from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { Product } from '../entity/Product';
import { Category } from '../entity/Category';

class productsController {

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const query = getRepository(Product)
        .createQueryBuilder('products')
        .leftJoinAndSelect('products.categories', 'categories')
        // .leftJoinAndSelect('products.comments', 'comments');

      if (req.query.search) {
        let { search } = req.query;
        query.where(`products.title like "%${search}%"`);
      }
      else if (req.query.filter) {
        let { filter } = req.query;
        query.where('categories.name = :name', { name: filter })
      }
      let products = await query.orderBy("RAND()").getMany();

      // let products = productsData.map(p => {
      //   let ratingSum = 0;
      //   let ratedTimes = 0;
      //   p.comments.forEach((c) => {
      //     if (c.rated && c.rating) {
      //       ratedTimes++;
      //       ratingSum += c.rating;
      //     }
      //   });
      //   return {
      //     ...p,
      //     ratingSum: ratingSum /ratedTimes
      //   }
      // });
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
      product.imageUrl = '/assets/images/product_placeholder.png';
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

  async getProductWithCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await getRepository(Product).findOne({
        where: {id: req.params.id},
        relations: ['categories']
      });
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      let product = await getRepository(Product).findOne({
        where: {id: req.params.id},
        relations: ['categories']
      });
      product.title = req.body.title;
      product.description = req.body.description;
      product.imageUrl = req.body.imageUrl;
      product.price = req.body.price;
      product.categories = req.body.categories;
      await getRepository(Product).save(product);

      return res.status(204).json(product);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      let product = await getRepository(Product).findOne(req.params.id);
      let test = await product.remove();
      console.log(test);
      return res.status(200).json({'message': 'product has been deleted!'});
    } catch (error) {
      console.log(error);
    }
  }

}

export default new productsController();