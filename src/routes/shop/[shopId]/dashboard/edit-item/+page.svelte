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
  <div class="container mx-auto px-4 py-8">
    <div class="mx-auto max-w-2xl">
      <h1 class="mb-4 text-2xl font-bold">Edita un producto</h1>
      <ItemForm {handleSubmit} initialValues={data} />
    </div>
  </div>
{/await}
