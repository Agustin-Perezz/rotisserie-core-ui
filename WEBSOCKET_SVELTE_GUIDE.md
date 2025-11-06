# WebSocket Integration Guide for Svelte/SvelteKit

Complete guide for implementing real-time order notifications in your Svelte/SvelteKit dashboard.

## Installation

```bash
npm install socket.io-client
```

## Basic Setup

### 1. Create WebSocket Store

Create a reusable Svelte store for managing WebSocket connections:

**`src/lib/stores/orderSocket.js`**

```javascript
import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function createOrderSocket(shopId) {
  const { subscribe, set, update } = writable({
    connected: false,
    orders: [],
    socket: null,
  });

  let socket = null;

  function connect() {
    socket = io(`${SOCKET_URL}/api/v1/orders`, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
      update((state) => ({ ...state, connected: true }));
      socket.emit('subscribeToShop', shopId);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket');
      update((state) => ({ ...state, connected: false }));
    });

    socket.on('newOrder', (order) => {
      console.log('🆕 New order received:', order);
      update((state) => ({
        ...state,
        orders: [order, ...state.orders],
      }));
    });

    socket.on('orderUpdated', (order) => {
      console.log('🔄 Order updated:', order);
      update((state) => ({
        ...state,
        orders: state.orders.map((o) => (o.id === order.id ? order : o)),
      }));
    });

    update((state) => ({ ...state, socket }));
  }

  function disconnect() {
    if (socket) {
      socket.emit('unsubscribeFromShop', shopId);
      socket.disconnect();
      socket = null;
    }
  }

  function addOrder(order) {
    update((state) => ({
      ...state,
      orders: [order, ...state.orders],
    }));
  }

  function updateOrder(order) {
    update((state) => ({
      ...state,
      orders: state.orders.map((o) => (o.id === order.id ? order : o)),
    }));
  }

  function removeOrder(orderId) {
    update((state) => ({
      ...state,
      orders: state.orders.filter((o) => o.id !== orderId),
    }));
  }

  return {
    subscribe,
    connect,
    disconnect,
    addOrder,
    updateOrder,
    removeOrder,
  };
}
```

## SvelteKit Implementation

### 2. Dashboard Page with Real-time Updates

**`src/routes/dashboard/+page.svelte`**

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import { createOrderSocket } from '$lib/stores/orderSocket';
  import OrderCard from '$lib/components/OrderCard.svelte';

  export let data;

  const shopId = data.shop.id;
  const orderSocket = createOrderSocket(shopId);

  let socketState;
  $: socketState = $orderSocket;

  onMount(() => {
    orderSocket.connect();

    if (data.existingOrders) {
      data.existingOrders.forEach((order) => {
        orderSocket.addOrder(order);
      });
    }
  });

  onDestroy(() => {
    orderSocket.disconnect();
  });

  function playNotificationSound() {
    const audio = new Audio('/notification.mp3');
    audio.play().catch((e) => console.log('Audio error:', e));
  }

  function showNotification(order) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Order!', {
        body: `Order #${order.id.slice(0, 8)} received`,
        icon: '/logo.png',
      });
    }
  }

  $: if (socketState.orders.length > 0) {
    playNotificationSound();
  }
</script>

<div class="dashboard">
  <header>
    <h1>Shop Dashboard</h1>
    <div class="status">
      {#if socketState.connected}
        <span class="badge badge-success">🟢 Live</span>
      {:else}
        <span class="badge badge-error">🔴 Disconnected</span>
      {/if}
    </div>
  </header>

  <div class="orders-container">
    <h2>Orders ({socketState.orders.length})</h2>

    {#if socketState.orders.length === 0}
      <div class="empty-state">
        <p>No orders yet. Waiting for new orders...</p>
      </div>
    {:else}
      <div class="orders-grid">
        {#each socketState.orders as order (order.id)}
          <OrderCard {order} on:update={(e) => orderSocket.updateOrder(e.detail)} />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .dashboard {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .badge {
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .badge-success {
    background: #10b981;
    color: white;
  }

  .badge-error {
    background: #ef4444;
    color: white;
  }

  .orders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
  }
</style>
```

### 3. Load Initial Orders

**`src/routes/dashboard/+page.js`**

```javascript
export async function load({ fetch, params }) {
  const shopId = params.shopId || 'your-shop-id';

  const response = await fetch(`/api/v1/orders/shop/${shopId}`);
  const existingOrders = await response.json();

  const shopResponse = await fetch(`/api/v1/shops/${shopId}`);
  const shop = await shopResponse.json();

  return {
    shop,
    existingOrders,
  };
}
```

## Component Examples

### 4. Order Card Component

**`src/lib/components/OrderCard.svelte`**

```svelte
<script>
  import { createEventDispatcher } from 'svelte';

  export let order;

  const dispatch = createEventDispatcher();

  const statusColors = {
    PENDING: 'orange',
    CONFIRMED: 'blue',
    PREPARING: 'purple',
    READY: 'green',
    DELIVERED: 'gray',
    CANCELLED: 'red',
  };

  async function updateOrderStatus(newStatus) {
    try {
      const response = await fetch(`/api/v1/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const updatedOrder = await response.json();
      dispatch('update', updatedOrder);
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  }

  $: total = order.orderItems.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0,
  );
</script>

<div class="order-card" class:new={isNew(order)}>
  <div class="order-header">
    <h3>Order #{order.id.slice(0, 8)}</h3>
    <span class="status" style="--color: {statusColors[order.status]}">
      {order.status}
    </span>
  </div>

  <div class="order-items">
    {#each order.orderItems as item}
      <div class="item">
        <span class="item-name">{item.quantity}x {item.item.name}</span>
        <span class="item-price">${item.item.price * item.quantity}</span>
      </div>
    {/each}
  </div>

  <div class="order-footer">
    <div class="total">
      <strong>Total:</strong>
      <strong>${total.toFixed(2)}</strong>
    </div>

    <div class="actions">
      {#if order.status === 'PENDING'}
        <button on:click={() => updateOrderStatus('CONFIRMED')}>
          Confirm
        </button>
      {/if}
      {#if order.status === 'CONFIRMED'}
        <button on:click={() => updateOrderStatus('PREPARING')}>
          Start Preparing
        </button>
      {/if}
      {#if order.status === 'PREPARING'}
        <button on:click={() => updateOrderStatus('READY')}>Mark Ready</button>
      {/if}
      {#if order.status === 'READY'}
        <button on:click={() => updateOrderStatus('DELIVERED')}>
          Mark Delivered
        </button>
      {/if}
    </div>
  </div>

  <div class="order-time">
    {new Date(order.createdAt).toLocaleString()}
  </div>
</div>

<style>
  .order-card {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .order-card.new {
    animation: slideIn 0.3s ease-out;
    border: 2px solid #10b981;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .status {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: var(--color);
    color: white;
  }

  .order-items {
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem 0;
    margin: 1rem 0;
  }

  .item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .order-footer {
    margin-top: 1rem;
  }

  .total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 1.125rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  button {
    flex: 1;
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 500;
  }

  button:hover {
    background: #2563eb;
  }

  .order-time {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: #6b7280;
  }
</style>

<script context="module">
  function isNew(order) {
    const orderTime = new Date(order.createdAt).getTime();
    const now = Date.now();
    return now - orderTime < 5000;
  }
</script>
```

## Advanced Features

### 5. Notification Permissions

**`src/lib/utils/notifications.js`**

```javascript
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export function showOrderNotification(order) {
  if (Notification.permission === 'granted') {
    const notification = new Notification('New Order Received! 🎉', {
      body: `Order #${order.id.slice(0, 8)} - ${order.orderItems.length} items`,
      icon: '/order-icon.png',
      badge: '/badge-icon.png',
      tag: order.id,
      requireInteraction: true,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }
}
```

### 6. Audio Notifications

**`src/lib/components/NotificationManager.svelte`**

```svelte
<script>
  import { onMount } from 'svelte';
  import { requestNotificationPermission } from '$lib/utils/notifications';

  let audio;
  let notificationsEnabled = false;

  onMount(async () => {
    notificationsEnabled = await requestNotificationPermission();
  });

  export function playSound() {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((e) => console.log('Audio playback failed:', e));
    }
  }
</script>

<audio bind:this={audio} src="/notification.mp3" preload="auto" />

{#if !notificationsEnabled}
  <div class="notification-prompt">
    <p>Enable notifications to get alerts for new orders</p>
    <button on:click={requestNotificationPermission}>Enable</button>
  </div>
{/if}
```

### 7. Connection Status Component

**`src/lib/components/ConnectionStatus.svelte`**

```svelte
<script>
  export let connected = false;
  export let reconnecting = false;
</script>

<div class="connection-status" class:connected class:reconnecting>
  {#if connected}
    <span class="indicator">🟢</span>
    <span>Connected</span>
  {:else if reconnecting}
    <span class="indicator">🟡</span>
    <span>Reconnecting...</span>
  {:else}
    <span class="indicator">🔴</span>
    <span>Disconnected</span>
  {/if}
</div>

<style>
  .connection-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-weight: 600;
    background: #fee;
    color: #c00;
  }

  .connection-status.connected {
    background: #efe;
    color: #060;
  }

  .connection-status.reconnecting {
    background: #ffe;
    color: #880;
  }

  .indicator {
    font-size: 0.75rem;
  }
</style>
```

## Environment Variables

**`.env`**

```bash
VITE_API_URL=http://localhost:3000
```

**`.env.production`**

```bash
VITE_API_URL=https://your-production-api.com
```

## Testing

### Test WebSocket in Browser Console

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/orders');

socket.on('connect', () => {
  console.log('Connected!');
  socket.emit('subscribeToShop', 'your-shop-id');
});

socket.on('newOrder', (order) => {
  console.log('New order:', order);
});

socket.on('orderUpdated', (order) => {
  console.log('Updated order:', order);
});
```

## Production Considerations

1. **Reconnection Logic**: Socket.IO handles reconnections automatically
2. **Authentication**: Add auth tokens to socket connection
3. **Error Handling**: Implement proper error boundaries
4. **Rate Limiting**: Be mindful of event frequency
5. **CORS**: Configure CORS properly in production

## Troubleshooting

### Connection Issues

```javascript
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('connect_timeout', () => {
  console.error('Connection timeout');
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});
```

### Debug Mode

```javascript
const socket = io(`${SOCKET_URL}/orders`, {
  transports: ['websocket'],
  debug: true,
});
```
