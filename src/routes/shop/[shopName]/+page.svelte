<script lang="ts">
  import { page } from '$app/state';
  import CardItem from '$lib/components/shop/CardItem.svelte';
  import { useFetch } from '$lib/hooks/useFetch';
  import CartOrder from './components/CartOrder.svelte';
  import { getShopByName } from '$lib/services/shop';

  const shopName = page.params.shopName;

  const {
    data: shop,
    loading,
    error
  } = useFetch(() => getShopByName(shopName), true);
</script>

{#if $loading}
  <p>Loading...</p>
{/if}

{#if $error}
  <div class="m-0 flex h-screen items-center justify-center">
    <p>Error loading items: {$error.message}</p>
  </div>
{/if}

{#if $shop?.items}
  <div class="mb-6">
    <h2 class="mb-3 text-lg font-semibold text-gray-800 sm:mb-4 sm:text-xl">
      Our Menu
    </h2>
    <CartOrder />
    <div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each $shop.items as item (item.id)}
        <CardItem {item} />
      {/each}
    </div>
  </div>
{/if}
