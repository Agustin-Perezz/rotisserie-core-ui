<script lang="ts">
  import ShopTable from './ShopTable.svelte';
  import ShopOrders from './ShopOrders.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import type { IItemTable } from '$lib/types/item';
  import type { TOrder } from '$lib/types/order';
  import type { Readable } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/state';

  type ShopDashboardProps = {
    items: IItemTable[];
    refetchItems?: () => void;
    orderSocket: Readable<{ connected: boolean; orders: TOrder[] }>;
  };

  let { items, refetchItems, orderSocket }: ShopDashboardProps = $props();

  const handleCreateItem = () => {
    goto(`${base}/shop/${page.params.shopId}/dashboard/new-item`);
  };
</script>

<div class="bg-muted/30 min-h-screen">
  <main class="container mx-auto px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="mb-1 text-3xl font-semibold">Dashboard</h1>
        <p class="text-muted-foreground flex items-center gap-2">
          Panel de administración
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <ShopOrders {orderSocket} />
      <div>
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h2 class="mb-1 text-xl font-semibold">Productos</h2>
            <p class="text-muted-foreground text-sm">
              Administra tus productos
            </p>
          </div>
          <Button onclick={handleCreateItem}>Crear Producto</Button>
        </div>
        <ShopTable data={items} {refetchItems} />
      </div>
    </div>
  </main>
</div>
