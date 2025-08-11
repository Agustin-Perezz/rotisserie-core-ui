import type { Base } from './base';

export type TShop = {
  name: string;
  description?: string;
  location: string;
} & Base;

export type TShopFormData = Pick<TShop, 'name' | 'description' | 'location'>;
