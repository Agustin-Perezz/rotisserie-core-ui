<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import ShopDashboard from './components/ShopDashboard.svelte';
  import { getShopById } from '$lib/services/shop';
  import { page } from '$app/state';
  import { useFetch } from '$lib/hooks/useFetch';
  import { createOrderSocket } from '$lib/stores/orderSocket';
  import { shopStore } from '$lib/stores/shop-store';

  const {
    data: shopData,
    loading,
    error,
    run: refetchShop
  } = useFetch(() => getShopById(page.params.shopId), true);

  const orderSocket = createOrderSocket(page.params.shopId);

  onMount(() => {
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
