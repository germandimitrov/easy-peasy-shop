import IComment from './IComment';
import ICategory from './ICategory';

export default interface IProduct {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  totalPrice?: number;
  orderedQuantity?: number;
  comments?: Array<IComment>;
  categories?: Array<ICategory>
}
