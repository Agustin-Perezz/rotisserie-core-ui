<script lang="ts">
  import { getItem, updateItem } from '$lib/services/item';
  import ItemForm from '../components/ItemForm.svelte';
  import LoadingSpinner from '$lib/components/ui/loading-spinner.svelte';
  import type { TItemFormData } from '$lib/types/item';
  import { page } from '$app/state';
  import { navigateToShop } from '$lib/utils/navigation';

  const getItemData = async () => {
    const itemId = page.url.searchParams.get('itemId') || '';
    return await getItem(itemId);
  };

  const handleSubmit = async (values: TItemFormData) => {
    await updateItem(values);
    navigateToShop(page.params.shopId);
  };
</script>

{#await getItemData()}
  <LoadingSpinner />
{:then data}
  <div class="flex h-screen flex-col items-center justify-center">
    <h1 class="mb-4 text-2xl font-bold">Edita un producto</h1>
    <ItemForm {handleSubmit} initialValues={data} />
  </div>
{/await}
