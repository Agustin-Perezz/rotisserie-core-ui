<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import Settings from '@lucide/svelte/icons/settings';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

  let {
    handleClickMpLogin,
    mpConnected
  }: { handleClickMpLogin: () => void; mpConnected: boolean } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <div class="relative">
        <Button {...props} variant="ghost" size="icon">
          <Settings class="h-5 w-5" />
        </Button>
        {#if !mpConnected}
          <span class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-400"
          ></span>
        {/if}
      </div>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" class="w-56">
    <DropdownMenu.Item onclick={handleClickMpLogin} disabled={mpConnected}>
      <img src="/mp-icon.svg" alt="Mercado Pago" class="mr-2 h-4 w-4" />
      Conectar Mercado Pago
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
