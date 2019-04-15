import { getRepository, Like } from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { Category } from '../entity/Category';

class CategoriesControllery {

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await getRepository(Category).find({});
      return res.status(200).json(categories);
    } catch (error) {
      console.log(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    let category = new Category();
    try {
      category = await getRepository(Category).findOne({
        name: Like(`%${req.body.category}%`)
      });

      if (!category) {
        category = <Category>{name: req.body.category};
        category = await getRepository(Category).save(category);
        return res.status(201).json(category);
      }
      else {
        return res.status(422).json({'error': category.name + ' already exists!'});
      }
    } catch (error) {
      console.log(error);
    }
  }

}

export default new CategoriesControllery();