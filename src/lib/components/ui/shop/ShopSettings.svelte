<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import Settings from '@lucide/svelte/icons/settings';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

  let { handleClickMpLogin }: { handleClickMpLogin: () => void } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon">
        <Settings class="h-5 w-5" />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" class="w-56">
    <DropdownMenu.Item onclick={handleClickMpLogin}>
      <img src="/mp-icon.svg" alt="Mercado Pago" class="mr-2 h-4 w-4" />
      Conectar Mercado Pago
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
