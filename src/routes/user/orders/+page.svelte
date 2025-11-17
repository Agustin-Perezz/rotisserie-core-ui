<script lang="ts">
  import { onMount } from 'svelte';
  import { getUserOrders } from '$lib/services/order';
  import { TOrderStatus, type TOrder } from '$lib/types/order';
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
  } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { errorToast } from '$lib/alerts/toast';
  import LoadingSpinner from '$lib/components/ui/loading-spinner.svelte';
  import { getOrderStatusLabel, getOrderStatusClasses } from '$lib/utils';
  import { currentUser } from '$lib/stores/auth-store';

  let orders = $state<TOrder[]>([]);
  let loading = $state(true);
  let filterType = $state<'active' | 'completed'>('active');

  const activeStatuses = [
    TOrderStatus.PENDING,
    TOrderStatus.PREPARING,
    TOrderStatus.READY,
    TOrderStatus.SENT
  ];

  const completedStatuses = [TOrderStatus.COMPLETED, TOrderStatus.CANCELLED];

  const filteredOrders = $derived(
    orders.filter((order) => {
      if (filterType === 'active') {
        return activeStatuses.includes(order.status);
      } else {
        return completedStatuses.includes(order.status);
      }
    })
  );

  const calculateTotal = (order: TOrder) => {
    return order.orderItems.reduce(
      (sum, item) => sum + item.item.price * item.quantity,
      0
    );
  };

  onMount(async () => {
    try {
      orders = await getUserOrders($currentUser?.uid || '');
    } catch {
      errorToast('Error al cargar tus pedidos');
    } finally {
      loading = false;
    }
  });
</script>

<div class="container mx-auto px-4 py-8">
  <div class="mb-6">
    <h1 class="text-3xl font-bold">Mis Pedidos</h1>
    <p class="text-muted-foreground mt-2">Consulta el estado de tus pedidos</p>
  </div>

  <div class="mb-6 flex gap-2">
    <Button
      variant={filterType === 'active' ? 'default' : 'outline'}
      onclick={() => (filterType = 'active')}
    >
      Activos
    </Button>
    <Button
      variant={filterType === 'completed' ? 'default' : 'outline'}
      onclick={() => (filterType = 'completed')}
    >
      Completados
    </Button>
  </div>

  {#if loading}
    <div class="flex justify-center py-12">
      <LoadingSpinner />
    </div>
  {:else if filteredOrders.length === 0}
    <div class="py-12 text-center">
      <p class="text-muted-foreground">
        {#if filterType === 'active'}
          No tienes pedidos activos
        {:else}
          No tienes pedidos completados
        {/if}
      </p>
    </div>
  {:else}
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each filteredOrders as order (order.id)}
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center justify-between text-base">
              <span>Pedido #{order.id.slice(0, 8)}</span>
              <span
                class="rounded-full px-2 py-1 text-xs font-normal {getOrderStatusClasses(
                  order.status
                )}"
              >
                {getOrderStatusLabel(order.status)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="border-b pb-2">
                <p class="text-sm font-medium">{order.shop.name}</p>
              </div>

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
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  {/if}
</div>
