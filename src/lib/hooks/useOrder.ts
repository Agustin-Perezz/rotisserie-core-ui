import { writable } from 'svelte/store';
import {
  orderStore,
  updateItemQuantity,
  removeItemFromOrder
} from '$lib/stores/order-store.js';
import { createOrder } from '$lib/services/order';
import type { TOrderContext } from '$lib/types/order';
import { createPreference } from '$lib/services/mp';

export const useOrder = (shopId: string, ownerId: string) => {
  const showPayment = writable(false);
  const shippingFee = writable(0);

  console.log('shopId', shopId);
  console.log('ownerId', ownerId);

  //const { createPaymentBrick } = useCheckoutBrick();

  const getSubtotal = (orderData: TOrderContext) => {
    return orderData?.totalPrice ?? 0;
  };

  const getTotal = (orderData: TOrderContext, shipping: number) => {
    return getSubtotal(orderData) + shipping;
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItemFromOrder(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const confirmOrder = async (orderData: TOrderContext) => {
    const { id: orderId } = await createOrder({
      shopId,
      orderItems: orderData.items
    });

    await createPreference({
      ownerId,
      orderId
    });

    showPayment.set(true);

    setTimeout(() => {
      //initializePaymentBrick(orderData);
    }, 50);
  };

  const initializePaymentBrick = async () => {
    try {
      //await createPaymentBrick('paymentBrick_container', getTotal(orderData, 0));
    } catch (error) {
      console.error('Failed to initialize payment brick:', error);
    }
  };

  return {
    order: orderStore,
    showPayment,
    shippingFee,
    // isLoading,
    handleQuantityChange,
    getSubtotal,
    getTotal,
    confirmOrder,
    initializePaymentBrick
  };
};
