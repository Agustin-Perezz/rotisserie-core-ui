<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { getShopById, updateShop } from '$lib/services/shop';
  import { useFetch } from '$lib/hooks/useFetch';
  import ShopForm from '$lib/components/shop/ShopForm.svelte';
  import LoadingSpinner from '$lib/components/ui/loading-spinner.svelte';
  import type { TShopFormData } from '$lib/types/shop';
  import { errorToast } from '$lib/alerts/toast';

  const shopId = page.params.shopId;

  const {
    data: shopData,
    loading,
    error
  } = useFetch(() => getShopById(shopId), true);

  const handleSubmit = async (values: TShopFormData) => {
    try {
      await updateShop(shopId, values);
      goto(`/shop/${shopId}/dashboard`);
    } catch (err: unknown) {
      errorToast('Error al actualizar negocio: ' + (err as Error).message);
    }
  };
</script>

<div class="container mx-auto px-4 py-8">
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-6 text-3xl font-bold">Actualizar Negocio</h1>

    {#if $loading}
      <LoadingSpinner />
    {:else if $error}
      <div class="flex items-center justify-center py-12">
        <p class="text-destructive">
          Error al cargar negocio: {$error.message}
        </p>
      </div>
    {:else if $shopData}
      <ShopForm
        {handleSubmit}
        initialValues={{
          name: $shopData.name,
          description: $shopData.description || '',
          location: $shopData.location
        }}
      />
    {/if}
  </div>
</div>
