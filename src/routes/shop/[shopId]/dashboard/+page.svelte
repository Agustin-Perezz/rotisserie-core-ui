<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import ShopDashboard from './components/ShopDashboard.svelte';
  import { getItemsByShopId } from '$lib/services/item';
  import { page } from '$app/state';
  import { useFetch } from '$lib/hooks/useFetch';
  import { createOrderSocket } from '$lib/stores/orderSocket';

  const {
    data: items,
    loading,
    error,
    run: refetchItems
  } = useFetch(() => getItemsByShopId(page.params.shopId), true);

  const orderSocket = createOrderSocket(page.params.shopId);

  onMount(() => orderSocket.connect());
  onDestroy(() => orderSocket.disconnect());
</script>

{#if $loading}
  <div class="flex h-screen items-center justify-center">
    <p>Cargando...</p>
  </div>
{:else if $error}
  <div class="flex h-screen items-center justify-center">
    <p class="text-destructive">Error al cargar productos: {$error.message}</p>
  </div>
{:else if $items}
  <ShopDashboard items={$items} {refetchItems} {orderSocket} />
{/if}
