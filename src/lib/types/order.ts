import type { TItem } from './item';

export enum TOrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export type TOrderItem = {
  itemId: string;
  quantity: number;
};

export type TCreateOrderDto = {
  items: TOrderItem[];
  totalPrice: number;
};

export type TCreateOrderRequest = {
  shopId: string;
  orderItems: TOrderItemContext[];
};

export type TOrderItemContext = Pick<
  TItem,
  'id' | 'name' | 'price' | 'image' | 'description' | 'shopId'
> & {
  quantity: number;
};

export type TOrderContext = {
  items: TOrderItemContext[];
  totalPrice: number;
};
