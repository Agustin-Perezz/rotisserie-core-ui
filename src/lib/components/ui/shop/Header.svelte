<script lang="ts ">
  import { Button } from '$lib/components/ui/button/index.js';
  import {
    navigateToLogin,
    navigateToLoginWithRedirect
  } from '$lib/utils/navigation';
  import { signOut } from '$lib/services/auth';
  import ShopSettings from './ShopSettings.svelte';
  import { currentShop } from '$lib/stores/shop-store';
  import { isAuthenticated } from '$lib/stores/auth-store';
  import { page } from '$app/state';

  const handleLogout = async () => {
    await signOut();
    navigateToLogin();
  };
</script>

<header class="border-border bg-card border-b">
  <div class="container mx-auto flex items-center justify-between px-4 py-4">
    <div class="flex items-center gap-2">
      <div class="bg-primary h-8 w-8 rounded-lg"></div>
      {#if $currentShop}
        <span class="text-lg font-semibold">{$currentShop.name}</span>
      {:else}
        <span class="text-lg font-semibold">Rotisserie</span>
      {/if}
    </div>
    <div class="flex items-center gap-2">
      {#if $currentShop}
        <ShopSettings />
      {/if}
      {#if $isAuthenticated}
        <Button variant="outline" onclick={handleLogout}>Cerrar sesión</Button>
      {:else}
        <Button
          variant="outline"
          onclick={() => navigateToLoginWithRedirect(page.url.pathname)}
          >Iniciar sesión</Button
        >
      {/if}
    </div>
  </div>
</header>
