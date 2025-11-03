import { io, type Socket } from 'socket.io-client';
import { writable } from 'svelte/store';
import type { TOrder } from '$lib/types/order';

type OrderSocketState = {
  connected: boolean;
  orders: TOrder[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function createOrderSocket(shopId: string) {
  const { subscribe, update } = writable<OrderSocketState>({
    connected: false,
    orders: []
  });
  let socket: Socket | null = null;

  function connect() {
    socket = io(`${API_BASE_URL}/orders`, { transports: ['websocket'] });

    socket.on('connect', () => {
      update((s) => ({ ...s, connected: true }));
      socket?.emit('subscribeToShop', shopId);
    });

    socket.on('newOrder', (order: TOrder) => {
      update((s) => ({ ...s, orders: [order, ...s.orders] }));
    });

    socket.on('orderUpdated', (order: TOrder) => {
      update((s) => ({
        ...s,
        orders: s.orders.map((o) => (o.id === order.id ? order : o))
      }));
    });
  }

  function disconnect() {
    socket?.disconnect();
  }

  function setInitialOrders(orders: TOrder[]) {
    update((s) => ({ ...s, orders }));
  }

  return { subscribe, connect, disconnect, setInitialOrders };
}
