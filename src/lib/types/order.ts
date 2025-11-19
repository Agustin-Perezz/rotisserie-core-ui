import type { TItem } from './item';
import type { TShop } from './shop';

export enum TOrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
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
  userId: string;
  orderItems: TOrderItemContext[];
};

export type TOrderItemContext = Pick<
  TItem,
  'id' | 'name' | 'price' | 'images' | 'description' | 'shopId'
> & {
  quantity: number;
};

export type TOrderContext = {
  items: TOrderItemContext[];
  totalPrice: number;
};

export type TOrderItemResponse = {
  id: string;
  itemId: string;
  orderId: string;
  quantity: number;
  item: TItem;
};

export type TOrder = {
  id: string;
  shopId: string;
  status: TOrderStatus;
  createdAt: string;
  deletedAt: string | null;
  orderItems: TOrderItemResponse[];
  shop: TShop;
};
