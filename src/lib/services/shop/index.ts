import { successToast } from '$lib/alerts/toast';
import api from '$lib/axios';
import type { TShop, TShopFormData } from '$lib/types/shop';

export const createShop = async (shopData: TShopFormData): Promise<TShop> => {
  const response = await api.post<TShop>('/shops', {
    ...shopData
  });
  successToast('Negocio creado exitosamente!');
  return response.data;
};
