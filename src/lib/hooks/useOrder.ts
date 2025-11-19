import { writable } from 'svelte/store';
import {
  orderStore,
  updateItemQuantity,
  removeItemFromOrder
} from '$lib/stores/order-store.js';
import { createOrder } from '$lib/services/order';
import type { TOrderContext } from '$lib/types/order';
import { createPreference, getSellerPublicKey } from '$lib/services/mp';
import { useCheckoutBrick } from './useCheckoutBrick';
import { getCurrentUser } from '$lib/stores/auth-store';

export const useOrder = (shopId: string, ownerId: string) => {
  const showPayment = writable(false);
  const shippingFee = writable(0);

  const { createPaymentBrick } = useCheckoutBrick();

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

  const handleConfirmOrder = async (orderData: TOrderContext) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const { id: orderId } = await createOrder({
      shopId,
      userId: currentUser.uid,
      orderItems: orderData.items
    });

    const { preferenceId } = await createPreference({
      ownerId,
      orderId
    });

    const { publicKey } = await getSellerPublicKey(ownerId);

    showPayment.set(true);

    await createPaymentBrick(
      'paymentBrick_container',
      preferenceId,
      publicKey,
      getTotal(orderData, 0),
      orderId
    );
  };

  return {
    order: orderStore,
    showPayment,
    shippingFee,
    // isLoading,
    handleQuantityChange,
    getSubtotal,
    getTotal,
    handleConfirmOrder
  };
};
