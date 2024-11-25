import { ObjectId } from 'mongoose';

export type TOrder = {
  email: string;
  product: ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};
