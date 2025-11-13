<script lang="ts">
  import { page } from '$app/state';
  import CardItem from '$lib/components/shop/CardItem.svelte';
  import { useFetch } from '$lib/hooks/useFetch';
  import CartOrder from './components/CartOrder.svelte';
  import { getShopByName } from '$lib/services/shop';
  import Store from '@lucide/svelte/icons/store';

  const shopName = page.params.shopName;

  const {
    data: shop,
    loading,
    error
  } = useFetch(() => getShopByName(shopName), true);
</script>

{#if $loading}
  <p>Cargando...</p>
{/if}

{#if $error}
  <div class="m-0 flex h-screen items-center justify-center">
    <p>Error al cargar los productos: {$error.message}</p>
  </div>
{/if}

{#if $shop?.items}
  <div class="mx-auto mb-6 max-w-3xl">
    <div class="mb-3 px-4 sm:mb-4">
      <div class="mt-6 flex items-center gap-3">
        <Store class="h-7 w-7 text-gray-900 sm:h-8 sm:w-8" />
        <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
          {$shop.name}
        </h1>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-800 sm:text-xl">
          Nuestro Menu
        </h2>
        <CartOrder shopId={$shop.id} ownerId={$shop.ownerId} />
      </div>
    </div>
    <div class="mx-2 mt-6 grid grid-cols-2 gap-4 sm:gap-6">
      {#each $shop.items as item (item.id)}
        <CardItem {item} />
      {/each}
    </div>
  </div>
{/if}
