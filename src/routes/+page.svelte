<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="flex h-screen flex-col items-center justify-center">
  <h1 class="mb-4 text-2xl font-bold">Hola!, como andas ?</h1>
  <Button href="/shop/new" data-testid="navigate-shop-button"
    >Crea un nuevo negocio</Button
  >
</div>
