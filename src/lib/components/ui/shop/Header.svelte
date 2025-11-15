<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import {
    navigateToLoginWithRedirect,
    navigateToLogin
  } from '$lib/utils/navigation';
  import ShopSettings from './ShopSettings.svelte';
  import UserMenu from './UserMenu.svelte';
  import { currentShop } from '$lib/stores/shop-store';
  import { isAuthenticated } from '$lib/stores/auth-store';
  import { page } from '$app/state';
  import { mpLogin } from '$lib/services/mp';
  import { signOut } from '$lib/services/auth';
  import { errorToast } from '$lib/alerts/toast';
  import { checkMpConnection } from '$lib/hooks/useMpConnection';

  let mpConnected = $state(false);

  $effect(() => {
    if ($currentShop?.ownerId) {
      checkMpConnection($currentShop.ownerId).then((connected) => {
        mpConnected = connected;
      });
    }
  });

  const handleClickMpLogin = async () => {
    try {
      if (!$currentShop) {
        return;
      }

      const response = await mpLogin($currentShop.ownerId);
      if (response.url) {
        window.location.href = response.url;
      }
    } catch {
      errorToast('Error al conectar con Mercado Pago');
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigateToLogin();
  };
</script>

<header class="border-border bg-card border-b">
  <div class="container mx-auto flex items-center justify-between px-4 py-4">
    <div class="flex items-center gap-2">
      <img src="/pedifast-header-logo.png" alt="PEDIFAST" class="h-12 w-auto" />
    </div>
    <div class="flex items-center gap-2">
      {#if $currentShop}
        <ShopSettings
          {handleClickMpLogin}
          {mpConnected}
          shopId={$currentShop.id}
        />
      {/if}
      {#if $isAuthenticated}
        <UserMenu onLogout={handleLogout} />
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
