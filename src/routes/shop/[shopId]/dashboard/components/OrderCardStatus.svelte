<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { TOrderStatus, type TOrder } from '$lib/types/order';
  import { updateOrderStatus } from '$lib/services/order';
  import { successToast, errorToast } from '$lib/alerts/toast';

  type OrderCardStatusProps = {
    order: TOrder;
  };

  let { order }: OrderCardStatusProps = $props();
  let isUpdating = $state(false);

  const getStatusLabel = (status: TOrderStatus): string => {
    const labels: Record<TOrderStatus, string> = {
      [TOrderStatus.PENDING]: 'Pendiente',
      [TOrderStatus.PREPARING]: 'En Preparación',
      [TOrderStatus.READY]: 'Listo',
      [TOrderStatus.COMPLETED]: 'Completado',
      [TOrderStatus.CANCELLED]: 'Cancelado'
    };
    return labels[status];
  };

  const getAvailableStatuses = (
    currentStatus: TOrderStatus
  ): TOrderStatus[] => {
    if (
      currentStatus === TOrderStatus.COMPLETED ||
      currentStatus === TOrderStatus.CANCELLED
    ) {
      return [];
    }

    const availableStatuses: TOrderStatus[] = [];

    if (currentStatus === TOrderStatus.PENDING) {
      availableStatuses.push(TOrderStatus.PREPARING, TOrderStatus.CANCELLED);
    } else if (currentStatus === TOrderStatus.PREPARING) {
      availableStatuses.push(TOrderStatus.READY, TOrderStatus.CANCELLED);
    } else if (currentStatus === TOrderStatus.READY) {
      availableStatuses.push(TOrderStatus.COMPLETED, TOrderStatus.CANCELLED);
    }

    return availableStatuses;
  };

  const handleUpdateStatus = async (newStatus: TOrderStatus) => {
    isUpdating = true;
    try {
      await updateOrderStatus(order.id, newStatus);
      successToast('Estado actualizado exitosamente');
    } catch (error) {
      console.error('Error updating order status:', error);
      errorToast('Error al actualizar el estado');
    } finally {
      isUpdating = false;
    }
  };

  const availableStatuses = $derived(getAvailableStatuses(order.status));
</script>

{#if availableStatuses.length > 0}
  <div class="border-t pt-2">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button {...props} size="sm" class="w-full" disabled={isUpdating}>
            Actualizar Estado
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {#each availableStatuses as status (status)}
          <DropdownMenu.Item
            onclick={() => handleUpdateStatus(status)}
            variant={status === TOrderStatus.CANCELLED
              ? 'destructive'
              : 'default'}
          >
            {getStatusLabel(status)}
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
{/if}
