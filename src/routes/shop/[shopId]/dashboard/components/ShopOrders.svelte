<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import OrderCard from './OrderCard.svelte';
  import type { TOrder } from '$lib/types/order';
  import type { Readable } from 'svelte/store';

  type ShopOrdersProps = {
    orderSocket: Readable<{ connected: boolean; orders: TOrder[] }>;
  };

  let { orderSocket }: ShopOrdersProps = $props();
</script>

<div class="w-full max-w-4xl">
  <div class="mb-4">
    <div class="flex items-center gap-2">
      <h2 class="mb-1 text-xl font-semibold">Pedidos en Vivo</h2>
      <span class="text-xs">
        {$orderSocket.connected ? '🟢 En Línea' : '🔴 Desconectado'}
      </span>
    </div>
    <p class="text-muted-foreground text-sm">
      {$orderSocket.orders.length} pedidos activos
    </p>
  </div>

  <div class="max-h-[600px] space-y-4 overflow-y-auto pr-2">
    {#each $orderSocket.orders as order (order.id)}
      <OrderCard {order} />
    {:else}
      <Card>
        <CardContent class="pt-6">
          <p class="text-muted-foreground text-center text-sm">
            No hay pedidos activos
          </p>
        </CardContent>
      </Card>
    {/each}
  </div>
</div>
