<script lang="ts">
  import ShopForm from '$lib/components/shop/ShopForm.svelte';
  import { createShop } from '$lib/services/shop';

  type Test = {
    name: string;
    description?: string;
    location: string;
  };

  const handleSubmit = async (values: Test) => {
    const test = await createShop(values);
    console.log('Shop created:', test);
  };
</script>

<div class="flex h-screen flex-col items-center justify-center">
  <h1 class="mb-4 text-2xl font-bold">Create a New Shop</h1>
  <ShopForm {handleSubmit} />
</div>
