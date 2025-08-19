import { writable } from 'svelte/store';
import type { TItem } from '$lib/types/item';
import type { TOrderContext } from '$lib/types/order';

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

export const addItemToOrder = (item: TItem) => {
  orderStore.update((orderState) => {
    if (!orderState) {
      return {
        items: [item],
        totalPrice: item.price
      };
    } else {
      const newItems = [...orderState.items, item];
      const newTotalPrice = newItems.reduce(
        (total, item) => total + item.price,
        0
      );
      return {
        items: newItems,
        totalPrice: newTotalPrice
      };
    }
  });
};

export const removeItemFromOrder = (itemId: string) => {
  orderStore.update((orderState) => {
    if (!orderState) {
      return emptyOrder;
    }

    const newItems = orderState.items.filter((item) => item.id !== itemId);
    const newTotalPrice = newItems.reduce(
      (total, item) => total + item.price,
      0
    );

    return {
      items: newItems,
      totalPrice: newTotalPrice
    };
  });
};

export { orderStore };
