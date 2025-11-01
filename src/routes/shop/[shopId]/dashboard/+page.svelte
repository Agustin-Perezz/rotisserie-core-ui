<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import ShopDashboard from './components/ShopDashboard.svelte';
  import { getShopById } from '$lib/services/shop';
  import { getOrdersByShop } from '$lib/services/order';
  import { page } from '$app/state';
  import { useFetch } from '$lib/hooks/useFetch';
  import { createOrderSocket } from '$lib/stores/orderSocket';
  import { shopStore } from '$lib/stores/shop-store';
  import { TOrderStatus } from '$lib/types/order';
  import { errorToast } from '$lib/alerts/toast';

  const shopId = page.params.shopId;

  const {
    data: shopData,
    loading,
    error,
    run: refetchShop
  } = useFetch(() => getShopById(shopId), true);

  const orderSocket = createOrderSocket(shopId);

  onMount(async () => {
    try {
      const existingOrders = await getOrdersByShop(
        shopId,
        TOrderStatus.PENDING
      );
      orderSocket.setInitialOrders(existingOrders);
    } catch (err: unknown) {
      errorToast('Error al cargar órdenes: ' + (err as Error).message);
    }

    orderSocket.connect();
  });

  onDestroy(() => orderSocket.disconnect());

  $: if ($shopData) {
    shopStore.setShop($shopData);
  }
</script>

{#if $loading}
  <div class="flex h-screen items-center justify-center">
    <p>Cargando...</p>
  </div>
{:else if $error}
  <div class="flex h-screen items-center justify-center">
    <p class="text-destructive">Error al cargar tienda: {$error.message}</p>
  </div>
{:else if $shopData}
  <ShopDashboard shop={$shopData} {refetchShop} {orderSocket} />
{/if}
