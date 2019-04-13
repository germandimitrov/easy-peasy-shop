import { getRepository, Like } from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { Comment } from '../entity/Comment';

class CommentsController {

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = getRepository(Comment).find({
        where: {
          product: req.params.id
        }
      });
      return res.status(200).json(comments);
    } catch (error) {
      console.log(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let comment = new Comment();
      comment = req.body;
      if (req.body.rating) {
        comment.rated = true;
      }
      comment.product = <any> {id: req.params.id};
      comment.user = req.user;
      comment = await getRepository(Comment).save(comment);
      return res.status(200).json(comment);
    } catch (error) {
      console.log(error);
    }
  }

}

export default new CommentsController();