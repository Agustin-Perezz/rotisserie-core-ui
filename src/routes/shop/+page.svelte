<script lang="ts">
  import ShopTable from './shop-table.svelte';
  import { columns } from './columns.js';

  // Mock data for shop payments
  const mockProducts = [
    {
      id: '1',
      name: 'Product A',
      description: 'Description for Product A',
      price: 49.99
    },
    {
      id: '2',
      name: 'Product B',
      description: 'Description for Product B',
      price: 124.5
    },
    {
      id: '3',
      name: 'Product C',
      description: 'Description for Product C',
      price: 75.25
    },
    {
      id: '4',
      name: 'Product D',
      description: 'Description for Product D',
      price: 199.99
    },
    {
      id: '5',
      name: 'Product E',
      description: 'Description for Product E',
      price: 32.75
    }
  ];
</script>

<div class="m-0 flex h-screen items-center justify-center">
  <ShopTable data={mockProducts} {columns} />
</div>
