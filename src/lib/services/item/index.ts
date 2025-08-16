import { successToast } from '$lib/alerts/toast';
import api from '$lib/axios';
import type {
  TItem,
  TCreateItemFormData,
  TUpdateItemFormData,
  IItemTable
} from '$lib/types/item';

export const getItem = async (id: string): Promise<TItem> => {
  const response = await api.get<TItem>(`/items/${id}`);
  return response.data;
};

export const getItems = async (shopId?: string): Promise<IItemTable[]> => {
  if (!shopId) {
    throw new Error('El id de la tienda es requerido.');
  }
  const response = await api.get<IItemTable[]>(`/items?shopId=${shopId}`);
  return response.data;
};

export const createItem = async (data: TCreateItemFormData): Promise<TItem> => {
  const response = await api.post<TItem>('/items', data);
  successToast('Item creado exitosamente!');
  return response.data;
};

export const updateItem = async (data: TUpdateItemFormData): Promise<TItem> => {
  const response = await api.patch<TItem>(`/items/${data.id}`, data);
  successToast('Item actualizado exitosamente!');
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
  successToast('Item eliminado exitosamente!');
};
