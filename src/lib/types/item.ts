import type { Base } from './base';

export type TItem = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  shopId: string;
} & Base;

export type IItemTable = Omit<
  TItem,
  'image' | 'createdAt' | 'updatedAt' | 'shopId'
>;

export type TCreateItemFormData = Omit<
  TItem,
  'createdAt' | 'updatedAt' | 'image'
> & {
  image?: File;
};
export type TUpdateItemFormData = Partial<TItem>;
