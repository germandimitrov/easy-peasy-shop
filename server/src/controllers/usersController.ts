import {getRepository, getConnection, LessThan} from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { User } from "../entity/User";
import { Role, roleName } from "../entity/Role";
import {sign, TokenExpiredError} from 'jsonwebtoken';
import { settings } from '../config/settings';
import encrypt from '../config/encryption';

class usersController {

  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.generateSessionJWT = this.generateSessionJWT.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  async getUsers(req: Request, res: Response) {
    return res.json(
      await getRepository(User).find()
    );
  }

  async register(req: Request, res: Response, next: NextFunction) {
    let user = new User();
    let salt = encrypt.generateSalt();
    user = req.body;
    user.rating = 3;
    user.active = true;
    if (user.picture === '' ||
        !user.picture ||
        !user.picture.startsWith('https') ||
        !user.picture.startsWith('http')
    ) {
      // set default avatar
      user.picture = '/assets/images/product_placeholder.png';
    }

    user.salt = salt;
    user.password = encrypt.generateHashedPassword(salt, req.body.password);

    try {
      const registeredUser = await getRepository(User).save(user);
      let role = new Role();
      role.name = roleName.User;
      role.user = registeredUser;
      await role.save();

      let token = this.generateSessionJWT(registeredUser);
      if (!token) throw new Error();
      return res.status(200).json({
        message: 'Success',
        token: token,
        user: user
      });

    } catch (error) {
      if (error.errno === 1062) {
        error.message = 'This email already used!';
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const user: User = await getRepository(User)
      .createQueryBuilder('users')
      .addSelect([
        'users.password', 'users.salt'
      ])
      .leftJoinAndSelect('users.roles', 'roles')
      .where('users.email = :email', { email: req.body.email })
      .getOne();

    if (!user) {
      return res.status(404).json({
        errors: [{ msg: 'Invalid Email or Password.' }]
      });
    }

    if (!this.validatePassword(user, req.body.password)) {
      return res.status(404).json({
        errors: [{ msg: 'Invalid Email or Password.' }]
      });
    }

    if (!user.active) {
      return res.status(403).json({
        errors: [{ msg: 'Your account has been suspended due to low rating.' }]
      });
    }

    try {
      let token = this.generateSessionJWT(user);
      if (!token) throw new Error();

      return res.status(200).json({
        message: 'Success',
        token: token,
        user: {
          ...user,
          password: undefined,
          salt: undefined
        }
      });

    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      let user = await getRepository(User).findOne({
        where: { id: req.params.id },
      });
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    if (req.user.id !== Number(req.params.id)) {
      return res.status(403).json({
        errors: [{ msg: 'Unauthorized to edit this profile!' }]
      });
    }

    try {
      let user = await getRepository(User).findOne({ id: Number(req.params.id) });
      user.username = req.body.username;
      user.email = req.body.email;
      user.address = req.body.address;
      user.phone = req.body.phone;
      user.picture = req.body.picture;
      user.save();
      return res.status(202).json(user);
    } catch (error) {
      next(error);
    }
  }


  async getActiveUsers(req: Request, res: Response, next: NextFunction) {
    try {
      let users = await getRepository(User).find();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      let user = await getRepository(User).findOne({
        where: {
          id: req.params.id
        },
        relations: [
          'orders',
          'orders.orderDetails',
          'orders.orderDetails.product'
        ]
      });
      return res.status(200).json(user.orders);
    } catch (error) {
      next(error);
    }
  }

  generateSessionJWT(user: User) {
    delete user.password;
    delete user.salt;
    return sign({ user: user }, settings.secretKey, {
      expiresIn: '1h'
    });
  }

  validatePassword(user: User, password: string) {
    return encrypt.generateHashedPassword(user.salt, password) === user.password;
  }

}

export default new usersController();