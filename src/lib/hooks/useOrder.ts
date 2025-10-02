import { writable } from 'svelte/store';
import {
  orderStore,
  updateItemQuantity,
  removeItemFromOrder
} from '$lib/stores/order-store.js';
import { createOrder } from '$lib/services/order';
import type { TOrderContext } from '$lib/types/order';

export const useOrder = () => {
  const showPayment = writable(false);
  const shippingFee = writable(0);

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
    await createOrder({
      shopId: orderData.items[0].shopId,
      orderItems: orderData.items
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
