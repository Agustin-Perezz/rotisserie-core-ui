import { successToast } from '$lib/alerts/toast';
import api from '$lib/axios';
import type { TCreateOrderRequest } from '$lib/types/order';

export const createOrder = async (data: TCreateOrderRequest): Promise<void> => {
  const orderData = {
    shopId: data.shopId,
    orderItems: data.orderItems.map((item) => ({
      itemId: item.id,
      quantity: item.quantity
    }))
  };

  const response = await api.post('/orders', orderData);
  successToast('Orden creada exitosamente!');
  return response.data;
};
