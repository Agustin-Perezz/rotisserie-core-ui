import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import DataTableActions from './data-table-actions.svelte';
import type { IItemTable } from '$lib/types/item';

export const columns: ColumnDef<IItemTable>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { id: row.original.id });
    }
  }
];
