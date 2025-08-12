export type TItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
};

export type IItemTable = Omit<TItem, 'image'>;
