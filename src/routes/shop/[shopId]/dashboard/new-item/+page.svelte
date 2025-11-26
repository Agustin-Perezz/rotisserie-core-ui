<script lang="ts">
  import { createItem } from '$lib/services/item';
  import ItemForm from '../components/ItemForm.svelte';
  import type { TItemFormData } from '$lib/types/item';
  import { navigateToShop } from '$lib/utils/navigation';
  import { page } from '$app/state';

  const handleSubmit = async (values: TItemFormData) => {
    await createItem(values);
    navigateToShop(page.params.shopId);
  };
</script>

<div class="container mx-auto px-4 py-8">
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-4 text-2xl font-bold">Crea un nuevo producto</h1>
    <ItemForm {handleSubmit} />
  </div>
</div>
