<script lang="ts">
  import { page } from '$app/state';
  import CardItem from '$lib/components/shop/CardItem.svelte';
  import type { TItem } from '$lib/types/item';

  const mockItems: TItem[] = [
    {
      id: '1',
      name: 'Classic Rotisserie Chicken',
      description: 'Perfectly seasoned and slow-roasted chicken',
      price: 12.99,
      image:
        'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
      shopId: 'shop1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'BBQ Ribs',
      description: 'Tender ribs with our signature BBQ sauce',
      price: 18.99,
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
      shopId: 'shop1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with herbs',
      price: 22.99,
      image:
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      shopId: 'shop1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Beef Brisket',
      description: 'Slow-cooked beef brisket with smoky flavor',
      price: 24.99,
      image:
        'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
      shopId: 'shop1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Pork Belly',
      description: 'Crispy pork belly with sweet glaze',
      price: 16.99,
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      shopId: 'shop1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Lamb Chops',
      description: 'Herb-crusted lamb chops with mint sauce',
      price: 28.99,
      image:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      shopId: 'shop1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
</script>

<div class="container mx-auto p-4 sm:p-6">
  <h1 class="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
    Shop: {page.params.shopName}
  </h1>

  <div class="mb-6">
    <h2 class="mb-3 text-lg font-semibold text-gray-800 sm:mb-4 sm:text-xl">
      Our Menu
    </h2>
    <div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each mockItems as item (item.id)}
        <CardItem {item} />
      {/each}
    </div>
  </div>
</div>
