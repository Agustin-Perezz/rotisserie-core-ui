<script lang="ts">
  import ShopForm from '$lib/components/shop/ShopForm.svelte';
  import { createShop } from '$lib/services/shop';
  import { navigateToShops } from '$lib/utils/navigation';

  type Test = {
    name: string;
    description?: string;
    location: string;
  };

  const handleSubmit = async (values: Test) => {
    await createShop(values);
    navigateToShops();
  };
</script>

<div class="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
  <h1 class="mb-4 text-2xl font-bold">Crear un Nuevo Negocio</h1>
  <ShopForm {handleSubmit} />
</div>
