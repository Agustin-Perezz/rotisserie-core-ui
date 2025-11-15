<script lang="ts">
  import { navigateToUserOrders } from '$lib/utils/navigation';
  import { currentUser } from '$lib/stores/auth-store';
  import { getInitials } from '$lib/utils';
  import {
    DropdownMenu,
    Trigger as DropdownMenuTrigger,
    Content as DropdownMenuContent,
    Item as DropdownMenuItem,
    Separator as DropdownMenuSeparator
  } from '$lib/components/ui/dropdown-menu';
  import {
    Avatar,
    AvatarImage,
    AvatarFallback
  } from '$lib/components/ui/avatar';

  export let onLogout: () => void | Promise<void>;
</script>

{#snippet userAvatar(className: string)}
  <Avatar class={className}>
    {#if $currentUser?.photoURL}
      <AvatarImage
        src={$currentUser.photoURL}
        alt={$currentUser.displayName || $currentUser.email || 'User'}
      />
    {/if}
    <AvatarFallback>
      {getInitials(
        $currentUser?.email || null,
        $currentUser?.displayName || null
      )}
    </AvatarFallback>
  </Avatar>
{/snippet}

<DropdownMenu>
  <DropdownMenuTrigger>
    {@render userAvatar('size-10 cursor-pointer')}
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" class="w-56">
    <div class="flex items-center gap-2 px-2 py-2">
      {@render userAvatar('size-8')}
      <div class="flex flex-col">
        <p class="text-sm font-medium">
          {$currentUser?.displayName || 'Usuario'}
        </p>
        <p class="text-muted-foreground truncate text-xs">
          {$currentUser?.email || ''}
        </p>
      </div>
    </div>
    <DropdownMenuSeparator />
    <DropdownMenuItem onclick={navigateToUserOrders}>
      Mis Pedidos
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive" onclick={onLogout}>
      Cerrar sesión
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
