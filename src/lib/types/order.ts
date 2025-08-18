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

export type TOrderContext = {
  items: TItem[];
  totalPrice: number;
};
