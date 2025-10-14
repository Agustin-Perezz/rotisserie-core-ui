<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { signOut } from '$lib/services/auth';

  const handleLogout = async () => {
    await signOut();
    goto(`${base}/login`);
  };
</script>

<header class="border-border bg-card border-b">
  <div class="container mx-auto flex items-center justify-between px-4 py-4">
    <div class="flex items-center gap-2">
      <div class="bg-primary h-8 w-8 rounded-lg"></div>
      <span class="text-lg font-semibold">Rotisserie</span>
    </div>
    <Button variant="outline" onclick={handleLogout}>Cerrar sesión</Button>
  </div>
</header>
