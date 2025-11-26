<script lang="ts">
  import { page } from '$app/state';
  import DashboardBreadcrumb from '$lib/components/ui/shop/DashboardBreadcrumb.svelte';
  import { currentShop } from '$lib/stores/shop-store';

  let { children } = $props();

  const getPageName = (pathname: string): string | undefined => {
    if (pathname.endsWith('/new-item')) return 'Nuevo Producto';
    if (pathname.includes('/edit-item')) return 'Editar Producto';
    if (pathname.endsWith('/edit-shop')) return 'Editar Negocio';
    return undefined;
  };

  const currentPage = $derived(getPageName(page.url.pathname));
</script>

<DashboardBreadcrumb
  shopId={page.params.shopId}
  shopName={$currentShop?.name || ''}
  {currentPage}
/>

{@render children()}
