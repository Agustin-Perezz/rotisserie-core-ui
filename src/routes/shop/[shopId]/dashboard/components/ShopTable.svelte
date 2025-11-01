<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import type { IItemTable } from '$lib/types/item';
  import { deleteItem } from '$lib/services/item';
  import { navigateToEditItem } from '$lib/utils/navigation';
  import { page } from '$app/state';
  import { currentItemId } from '$lib/stores/item-store';

  type ShopTableProps = {
    data: IItemTable[];
    refetchItems?: () => void;
  };

  let { data, refetchItems }: ShopTableProps = $props();

  const handleEdit = (id: string) => {
    currentItemId.set(id);
    navigateToEditItem(page.params.shopId, id);
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    if (refetchItems) {
      refetchItems();
    }
  };
</script>

<Card.Root class="w-full shadow-md" data-testid="shop-table">
  <Table.Root>
    <Table.Header>
      <Table.Row class="bg-muted/50">
        <Table.Head class="font-semibold">Nombre</Table.Head>
        <Table.Head class="hidden font-semibold md:table-cell"
          >Descripción</Table.Head
        >
        <Table.Head class="font-semibold">Precio</Table.Head>
        <Table.Head class="text-right font-semibold">Acciones</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data as item (item.id)}
        <Table.Row class="hover:bg-muted/30">
          <Table.Cell class="max-w-[150px] truncate md:max-w-none"
            >{item.name}</Table.Cell
          >
          <Table.Cell class="text-muted-foreground hidden md:table-cell"
            >{item.description ?? '-'}</Table.Cell
          >
          <Table.Cell class="font-medium">${item.price.toFixed(2)}</Table.Cell>
          <Table.Cell class="text-right">
            <div class="flex items-center justify-end gap-1 md:gap-2">
              <Button
                variant="outline"
                size="sm"
                onclick={() => handleEdit(item.id)}
              >
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onclick={() => handleDelete(item.id)}
                class="text-destructive hover:text-destructive"
              >
                Eliminar
              </Button>
            </div>
          </Table.Cell>
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell colspan={4} class="h-24 text-center">
            No hay resultados.
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</Card.Root>
