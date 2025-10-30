<script lang="ts">
  import { onMount } from 'svelte';
  import { getAuth } from 'firebase/auth';
  import { getShopsByOwner } from '$lib/services/shop';
  import { navigateToShopNew, navigateToShop } from '$lib/utils/navigation';
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '$lib/components/ui/card';
  import type { TShop } from '$lib/types/shop';

  let shops: TShop[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        error = 'Usuario no autenticado';
        return;
      }

      shops = await getShopsByOwner(user.uid);
    } catch (err) {
      error = 'Error al cargar los negocios';
      console.error(err);
    } finally {
      loading = false;
    }
  });

  const handleShopClick = (shopId: string) => {
    navigateToShop(shopId);
  };
</script>

<div class="container mx-auto px-4 py-8">
  <div class="mb-8 flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Mis Negocios</h1>
      <p class="text-muted-foreground">
        Gestiona tus negocios y configuraciones
      </p>
    </div>
    <Button onclick={() => navigateToShopNew()}>Crear Nuevo Negocio</Button>
  </div>

  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="text-muted-foreground">Cargando negocios...</div>
    </div>
  {:else if error}
    <div class="flex items-center justify-center py-12">
      <div class="text-destructive">{error}</div>
    </div>
  {:else if shops.length === 0}
    <div class="flex flex-col items-center justify-center py-12 text-center">
      <div class="mb-4 text-6xl">🏪</div>
      <h3 class="mb-2 text-xl font-semibold">No tienes negocios aún</h3>
      <p class="text-muted-foreground mb-6">
        Crea tu primer negocio para comenzar
      </p>
      <Button onclick={() => navigateToShopNew()}>
        Crear Mi Primer Negocio
      </Button>
    </div>
  {:else}
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each shops as shop (shop.id)}
        <Card
          class="hover:bg-muted/50 cursor-pointer transition-colors"
          onclick={() => handleShopClick(shop.id)}
        >
          <CardHeader>
            <CardTitle class="text-xl">{shop.name}</CardTitle>
            {#if shop.description}
              <CardDescription>{shop.description}</CardDescription>
            {/if}
          </CardHeader>
          <CardContent>
            <div class="text-muted-foreground text-sm">
              <p>📍 {shop.location}</p>
              <p>🛍️ {shop.items?.length || 0} productos</p>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  {/if}
</div>
