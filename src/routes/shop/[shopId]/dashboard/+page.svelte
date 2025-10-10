<script lang="ts">
  import ShopTable from './components/ShopTable.svelte';
  import { getItemsByShopId } from '$lib/services/item';
  import { page } from '$app/state';
  import { useFetch } from '$lib/hooks/useFetch';

  const {
    data: items,
    loading,
    error,
    run: refetchItems
  } = useFetch(() => getItemsByShopId(page.params.shopId), true);
</script>

{#if $loading}
  <p>Loading...</p>
{:else if $error}
  <div class="m-0 flex h-screen items-center justify-center">
    <p>Error loading items: {$error.message}</p>
  </div>
{:else if $items}
  <div class="m-0 flex h-screen items-center justify-center">
    <ShopTable data={$items} {refetchItems} />
  </div>
{/if}
