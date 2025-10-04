import type { Base } from './base';
import type { TItem } from './item';

export type TShop = {
  name: string;
  description?: string;
  location: string;
  ownerId: string;
  items?: TItem[];
} & Base;

export type TShopFormData = Pick<TShop, 'name' | 'description' | 'location'>;
