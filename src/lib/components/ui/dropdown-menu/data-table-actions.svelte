<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

  type Props = {
    handleClickEdit: () => void;
    handleClickDelete: () => void;
  };

  let { handleClickEdit, handleClickDelete }: Props = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="ghost"
        size="icon"
        class="relative size-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <EllipsisIcon />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Acciones</DropdownMenu.Label>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onclick={handleClickEdit}>Editar</DropdownMenu.Item>
    <DropdownMenu.Item onclick={handleClickDelete}>Eliminar</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
