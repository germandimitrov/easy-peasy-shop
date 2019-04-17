import IProduct from './IProduct';
import IOrder from './IOrder';

export default interface IOrderDetails {
  id?: number;
  orderedQuantity: number;
  product?: IProduct;
  order?: IOrder;
}