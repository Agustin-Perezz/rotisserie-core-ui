import { successToast } from '$lib/alerts/toast';
import api from '$lib/axios';
import type { TItem, IItemTable, TItemFormData } from '$lib/types/item';
import { objectToFormData } from '$lib/utils';

export const getItem = async (id: string): Promise<TItem> => {
  const response = await api.get<TItem>(`/items/${id}`);
  return response.data;
};

export const getItemsByShopId = async (
  shopId: string
): Promise<IItemTable[]> => {
  const response = await api.get<IItemTable[]>(`/items?shopId=${shopId}`);
  return response.data;
};

export const getItemsByShopName = async (
  shopName: string
): Promise<TItem[]> => {
  const response = await api.get<TItem[]>(`/items/shop/${shopName}`);
  return response.data;
};

export const createItem = async (data: TItemFormData): Promise<TItem> => {
  const formData = objectToFormData(data);

  const response = await api.post<TItem>('/items', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  successToast('Item creado exitosamente!');
  return response.data;
};

export const updateItem = async (data: TItemFormData): Promise<TItem> => {
  const formData = objectToFormData(data);
  const response = await api.patch<TItem>(`/items/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  successToast('Item actualizado exitosamente!');
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
  successToast('Item eliminado exitosamente!');
};

export const deleteItemImage = async (
  itemId: string,
  imageUrl: string
): Promise<void> => {
  await api.delete(`/items/${itemId}/images`, {
    params: { imageId: imageUrl }
  });
  successToast('Imagen eliminada exitosamente!');
};
