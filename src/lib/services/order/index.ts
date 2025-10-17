import api from '$lib/axios';
import type { TCreateOrderRequest, TOrder } from '$lib/types/order';

export const createOrder = async (
  data: TCreateOrderRequest
): Promise<TOrder> => {
  const orderData = {
    shopId: data.shopId,
    orderItems: data.orderItems.map((item) => ({
      itemId: item.id,
      quantity: item.quantity
    }))
  };

  const response = await api.post('/orders', orderData);
  return response.data;
};
