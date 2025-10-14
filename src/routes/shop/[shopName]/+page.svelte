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
  <div class="mx-auto mb-6 max-w-3xl">
    <div class="mb-3 flex items-center justify-between px-4 sm:mb-4">
      <h2 class="mt-6 text-lg font-semibold text-gray-800 sm:text-xl">
        Nuestro Menu
      </h2>
      <CartOrder shopId={$shop.id} ownerId={$shop.ownerId} />
    </div>
    <div class="mx-2 mt-6 grid grid-cols-2 gap-4 sm:gap-6">
      {#each $shop.items as item (item.id)}
        <CardItem {item} />
      {/each}
    </div>
  </div>
{/if}
