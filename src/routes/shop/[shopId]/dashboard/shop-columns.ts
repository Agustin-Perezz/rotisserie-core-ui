import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import type { IItemTable } from '$lib/types/item';
import DataTableActions from '$lib/components/ui/dropdown-menu/data-table-actions.svelte';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { currentItemId } from '$lib/stores/item-store';
import { deleteItem } from '$lib/services/item';

export const createColumns = (
  refetchItems?: () => void
): ColumnDef<IItemTable>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Nombre'
  },
  {
    accessorKey: 'description',
    header: 'Descripción'
  },
  {
    accessorKey: 'price',
    header: 'Precio'
  },
  {
    header: 'Acciones',
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(DataTableActions, {
        handleClickEdit: () => {
          currentItemId.set(row.original.id);
          goto(`/shop/${page.params.shopId}/dashboard/edit-item`);
        },
        handleClickDelete: async () => {
          await deleteItem(row.original.id);
          if (refetchItems) {
            refetchItems();
          }
        }
      });
    }
  }
];
