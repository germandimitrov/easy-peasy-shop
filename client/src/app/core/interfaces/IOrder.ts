import IUser from './IUser';

export default interface IOrder {
  id?: number;
  status: string;
  user?: IUser;
}
