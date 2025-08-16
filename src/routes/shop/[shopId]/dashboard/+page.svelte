<script lang="ts">
  import ShopTable from './components/ShopTable.svelte';
  import { getItems } from '$lib/services/item';
  import { page } from '$app/state';
  import { useFetch } from '$lib/hooks/useFetch';
  import { createColumns } from './shop-columns';

  const {
    data: items,
    loading,
    error,
    run: refetchItems
  } = useFetch(() => getItems(page.params.shopId), true);

  const columns = createColumns(refetchItems);
</script>

{#if $loading}
  <p>Loading...</p>
{:else if $error}
  <div class="m-0 flex h-screen items-center justify-center">
    <p>Error loading items: {$error.message}</p>
  </div>
{:else if $items}
  <div class="m-0 flex h-screen items-center justify-center">
    <ShopTable data={$items} {columns} />
  </div>
{/if}
