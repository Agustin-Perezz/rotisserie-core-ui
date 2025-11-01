<script lang="ts">
  import ShopTable from './ShopTable.svelte';
  import ShopOrders from './ShopOrders.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import type { TShop } from '$lib/types/shop';
  import type { TOrder } from '$lib/types/order';
  import type { Readable } from 'svelte/store';
  import { navigateToNewItem } from '$lib/utils/navigation';
  import { page } from '$app/state';

  type ShopDashboardProps = {
    shop: TShop;
    refetchShop?: () => void;
    orderSocket: Readable<{ connected: boolean; orders: TOrder[] }>;
  };

  let { shop, refetchShop, orderSocket }: ShopDashboardProps = $props();

  const handleCreateItem = () => {
    navigateToNewItem(page.params.shopId);
  };
</script>

<div class="bg-muted/30 min-h-screen">
  <main class="container mx-auto px-4 py-8">
    <div class="mb-6 flex flex-col items-center">
      <div class="w-full max-w-4xl">
        <div>
          <h1 class="mb-1 text-3xl font-semibold">Dashboard</h1>
          <p class="text-muted-foreground flex items-center gap-2">
            Panel de administración
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-6">
      <ShopOrders {orderSocket} />
      <div class="w-full max-w-4xl">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h2 class="mb-1 text-xl font-semibold">Productos</h2>
            <p class="text-muted-foreground text-sm">
              Administra tus productos
            </p>
          </div>
          <Button onclick={handleCreateItem}>Crear Producto</Button>
        </div>
        <ShopTable data={shop.items || []} refetchItems={refetchShop} />
      </div>
    </div>
  </main>
</div>
