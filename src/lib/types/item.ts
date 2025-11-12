import type { Base } from './base';

export type TItem = {
  name: string;
  description?: string;
  price: number;
  images?: TItemImage[];
  shopId: string;
} & Base;

export type TItemImage = {
  url: string;
  id: string;
};

export type IItemTable = Omit<
  TItem,
  'images' | 'createdAt' | 'updatedAt' | 'shopId'
>;

export type TItemFormData = Omit<
  TItem,
  'createdAt' | 'updatedAt' | 'images'
> & {
  images?: File[];
};
