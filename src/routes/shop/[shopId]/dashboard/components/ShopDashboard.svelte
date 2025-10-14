<script lang="ts">
  import ShopTable from './ShopTable.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import type { IItemTable } from '$lib/types/item';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/state';

  type ShopDashboardProps = {
    items: IItemTable[];
    refetchItems?: () => void;
  };

  let { items, refetchItems }: ShopDashboardProps = $props();

  const handleCreateItem = () => {
    goto(`${base}/shop/${page.params.shopId}/dashboard/new-item`);
  };
</script>

<div class="bg-muted/30 min-h-screen">
  <main class="container mx-auto flex justify-center px-4 py-8">
    <div class="w-full max-w-4xl">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="mb-1 text-3xl font-semibold">Productos</h1>
          <p class="text-muted-foreground">Administra tus productos</p>
        </div>
        <Button onclick={handleCreateItem}>Crear Producto</Button>
      </div>

      <ShopTable data={items} {refetchItems} />
    </div>
  </main>
</div>
