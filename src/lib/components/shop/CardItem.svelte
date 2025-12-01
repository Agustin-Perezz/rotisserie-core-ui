<script lang="ts">
  import { addItemToOrder } from '$lib/stores/order-store';
  import type { TItem } from '$lib/types/item';
  import { Plus } from '@lucide/svelte';

  export let item: TItem;
  export let index: number | undefined = undefined;

  const LIMIT_IMAGES_RENDERED = 6;
</script>

<div
  class="max-w-sm overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-md md:flex"
>
  <div
    class="aspect-square overflow-hidden bg-gray-50 md:w-32 md:flex-shrink-0"
  >
    <img
      src={item.images?.[0]?.url || '/default-item-image.webp'}
      alt={item.name}
      class="h-full w-full object-cover"
      loading={index !== undefined && index >= LIMIT_IMAGES_RENDERED
        ? 'lazy'
        : 'eager'}
    />
  </div>
  <div class="flex flex-col justify-between p-2 md:flex-1">
    <h3 class="mb-1 text-sm font-medium text-gray-900">{item.name}</h3>
    <div class="flex items-center justify-between">
      <span class="text-sm">
        $ {item.price}
      </span>
      <button
        class="rounded-full bg-blue-800 p-1.5 text-white transition-colors hover:opacity-90"
        aria-label="Agregar {item.name} al carrito"
        onclick={() =>
          addItemToOrder({
            ...item,
            quantity: 1
          })}
      >
        <Plus class="h-4 w-4" />
      </button>
    </div>
  </div>
</div>
