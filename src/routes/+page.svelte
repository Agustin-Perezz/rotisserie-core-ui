<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { navigateToLogin } from '$lib/utils/navigation';
</script>

<div class="flex h-screen flex-col items-center justify-center">
  <h1 class="mb-4 text-2xl font-bold">Hola!, como andas ?</h1>
  <Button onclick={navigateToLogin} data-testid="navigate-login-button"
    >Iniciar sesión</Button
  >
</div>
