import api from '$lib/axios';
import type {
  TCreateOrderRequest,
  TOrder,
  TOrderStatus
} from '$lib/types/order';

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

export const updateOrderStatus = async (
  orderId: string,
  status: TOrderStatus
): Promise<TOrder> => {
  const response = await api.patch(`/orders/${orderId}`, { status });
  return response.data;
};
