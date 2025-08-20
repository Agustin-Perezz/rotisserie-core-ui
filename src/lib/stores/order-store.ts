import { writable } from 'svelte/store';
import type { TOrderContext, TOrderItemContext } from '$lib/types/order';
import { calculateTotalPrice } from '$lib/utils';

const emptyOrder: TOrderContext = {
  items: [],
  totalPrice: 0
};

const orderStore = writable<TOrderContext>(emptyOrder);

export const getOrder = () => {
  let currentOrder: TOrderContext = emptyOrder;
  orderStore.subscribe((value) => {
    currentOrder = value;
  })();
  return currentOrder;
};

export const clearOrder = () => {
  orderStore.set(emptyOrder);
};

export const addItemToOrder = (item: TOrderItemContext) => {
  orderStore.update((orderState) => {
    const newItems = [...orderState.items, item];
    const newTotalPrice = calculateTotalPrice(newItems);
    return {
      items: newItems,
      totalPrice: newTotalPrice
    };
  });
};

export const removeItemFromOrder = (itemId: string) => {
  orderStore.update((orderState) => {
    const newItems = orderState.items.filter((item) => item.id !== itemId);
    const newTotalPrice = calculateTotalPrice(newItems);

    return {
      items: newItems,
      totalPrice: newTotalPrice
    };
  });
};

export const updateItemQuantity = (itemId: string, newQuantity: number) => {
  orderStore.update((orderState) => {
    const itemToUpdate = orderState.items.find((item) => item.id === itemId);
    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
    }

    const newTotalPrice = calculateTotalPrice(orderState.items);

    return {
      items: orderState.items,
      totalPrice: newTotalPrice
    };
  });
};

export { orderStore };
