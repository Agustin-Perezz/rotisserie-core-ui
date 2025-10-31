<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { navigateToLogin, navigateToShops } from '$lib/utils/navigation';
  import { isAuthenticated, isAuthLoading } from '$lib/stores/auth-store';
</script>

<div class="flex h-screen flex-col items-center justify-center">
  <h1 class="mb-4 text-2xl font-bold">Hola!, como andas ?</h1>
  {#if $isAuthLoading}
    <div class="text-lg">Cargando...</div>
  {:else if $isAuthenticated}
    <Button onclick={navigateToShops}>Ir a mis tiendas</Button>
  {:else}
    <Button onclick={navigateToLogin} data-testid="navigate-login-button"
      >Iniciar sesión</Button
    >
  {/if}
</div>
