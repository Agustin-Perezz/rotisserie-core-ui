import type { TItem } from '$lib/types/item';
import type { TOrderContext } from '$lib/types/order';

let orderState = $state<TOrderContext | null>(null);

export const getOrder = () => orderState;

export const clearOrder = () => {
  orderState = null;
};

export const addItemToOrder = (item: TItem) => {
  if (!orderState) {
    createOrder();
  } else {
    orderState.items.push(item);
    orderState.totalPrice = orderState.items.reduce(
      (total, item) => total + item.price,
      0
    );
  }
};

export const removeItemFromOrder = (itemId: string) => {
  if (orderState) {
    const index = orderState.items.findIndex((item) => item.id === itemId);
    if (index > -1) {
      orderState.items.splice(index, 1);
      orderState.totalPrice = orderState.items.reduce(
        (total, item) => total + item.price,
        0
      );
    }
  }
};

const createOrder = () => {
  const newOrder: TOrderContext = {
    items: [],
    totalPrice: 0
  };

  orderState = newOrder;
};
