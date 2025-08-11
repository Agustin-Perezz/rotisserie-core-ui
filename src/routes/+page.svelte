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

<ShopForm {handleSubmit} />
