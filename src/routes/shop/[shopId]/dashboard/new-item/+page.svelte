<script lang="ts">
  import { createItem } from '$lib/services/item';
  import type { TCreateItemFormData } from '$lib/types/item';
  import ItemForm from '../components/ItemForm.svelte';

  const handleSubmit = async (values: TCreateItemFormData) => {
    // Handle form submission logic here
    await createItem(values);
    console.log('Form submitted with values:', values);
  };
</script>

<div class="flex h-screen flex-col items-center justify-center">
  <h1 class="mb-4 text-2xl font-bold">Crea un nuevo producto</h1>
  <ItemForm {handleSubmit} />
</div>
