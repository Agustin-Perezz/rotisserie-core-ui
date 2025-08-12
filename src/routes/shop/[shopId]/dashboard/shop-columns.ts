import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import type { IItemTable } from '$lib/types/item';
import DataTableActions from '$lib/components/ui/dropdown-menu/data-table-actions.svelte';

export const columns: ColumnDef<IItemTable>[] = [
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
          console.log('Edit', row.original.id);
        },
        handleClickDelete: () => {
          console.log('Delete', row.original.id);
        }
      });
    }
  }
];
