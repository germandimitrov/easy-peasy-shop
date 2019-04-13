export default interface IUser {
  id: number;
  active: boolean;
  address: string;
  email: string;
  phone: number;
  picture: string;
  rating: number;
  roles: Array<any>;
  username: string;
  createdAt: string;
  updatedAt: string;
}

// interface Roles {
//   length: any;
//   [index: number]: { id: number; name: string; };
// }
