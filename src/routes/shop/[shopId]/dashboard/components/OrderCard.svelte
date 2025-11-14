<script lang="ts">
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
  } from '$lib/components/ui/card';
  import { TOrderStatus, type TOrder } from '$lib/types/order';
  import OrderCardStatus from './OrderCardStatus.svelte';

  type OrderCardProps = {
    order: TOrder;
  };

  let { order }: OrderCardProps = $props();

  const calculateTotal = (order: TOrder) => {
    return order.orderItems.reduce(
      (sum, item) => sum + item.item.price * item.quantity,
      0
    );
  };
</script>

<Card>
  <CardHeader>
    <CardTitle class="flex items-center justify-between text-base">
      <span>Pedido #{order.id.slice(0, 8)}</span>
      <span
        class="rounded-full px-2 py-1 text-xs font-normal"
        class:bg-yellow-100={order.status === TOrderStatus.PENDING}
        class:bg-gray-100={order.status === TOrderStatus.PREPARING}
        class:bg-green-100={order.status === TOrderStatus.READY}
        class:bg-blue-100={order.status === TOrderStatus.SENT}
        class:bg-green-200={order.status === TOrderStatus.COMPLETED}
        class:bg-red-100={order.status === TOrderStatus.CANCELLED}
      >
        {order.status}
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div class="space-y-2">
      {#each order.orderItems as orderItem (orderItem.id)}
        <div class="flex justify-between text-sm">
          <span>{orderItem.quantity}x {orderItem.item.name}</span>
          <span>${orderItem.item.price.toFixed(2)}</span>
        </div>
      {/each}
      <div class="flex justify-between border-t pt-2 font-semibold">
        <span>Total</span>
        <span>${calculateTotal(order).toFixed(2)}</span>
      </div>
      <div class="text-muted-foreground text-xs">
        {new Date(order.createdAt).toLocaleString('es-ES')}
      </div>

      <OrderCardStatus {order} />
    </div>
  </CardContent>
</Card>
