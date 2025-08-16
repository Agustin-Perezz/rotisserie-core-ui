<script lang="ts">
  import { getItem, updateItem } from '$lib/services/item';
  import type { TCreateItemFormData } from '$lib/types/item';
  import ItemForm from '../components/ItemForm.svelte';
  import { currentItemId } from '$lib/stores/item-store';

  const getItemData = async () => {
    return await getItem($currentItemId);
  };

  const handleSubmit = async (values: TCreateItemFormData) => {
    await updateItem(values);
    console.log('Form submitted with values:', values);
  };
</script>

{#await getItemData()}
  <p>Loading...</p>
{:then data}
  <div class="flex h-screen flex-col items-center justify-center">
    <h1 class="mb-4 text-2xl font-bold">Edita un producto</h1>
    <ItemForm {handleSubmit} initialValues={data} />
  </div>
{/await}
