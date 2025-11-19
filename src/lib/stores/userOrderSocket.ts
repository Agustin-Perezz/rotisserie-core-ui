import { io, type Socket } from 'socket.io-client';
import { writable } from 'svelte/store';
import type { TOrder } from '$lib/types/order';

type UserOrderSocketState = {
  connected: boolean;
  order: TOrder | null;
  updatedAt: number | null;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function createUserOrderSocket(orderId: string, userId: string) {
  const { subscribe, update } = writable<UserOrderSocketState>({
    connected: false,
    order: null,
    updatedAt: null
  });
  let socket: Socket | null = null;

  function connect() {
    socket = io(`${API_BASE_URL}/orders`, { transports: ['websocket'] });

    socket.on('connect', () => {
      update((s) => ({ ...s, connected: true }));
      socket?.emit('subscribeToOrder', { orderId, userId });
    });

    socket.on('orderUpdated', (order: TOrder) => {
      update((s) => ({
        ...s,
        order,
        updatedAt: Date.now()
      }));
    });

    socket.on('disconnect', () => {
      update((s) => ({ ...s, connected: false }));
    });
  }

  function disconnect() {
    socket?.disconnect();
    socket = null;
  }

  function setOrder(order: TOrder) {
    update((s) => ({ ...s, order }));
  }

  return { subscribe, connect, disconnect, setOrder };
}
