<script lang="ts">
  import { addItemToOrder } from '$lib/stores/order-store';
  import type { TItem } from '$lib/types/item';

  export let item: TItem;

  const randomSeed = item.id || Math.random().toString(36).substring(7);
  const mockImage =
    item.image || `https://picsum.photos/seed/${randomSeed}/400/600`;
</script>

<div
  class="max-w-sm overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-md md:flex"
>
  <div
    class="aspect-square overflow-hidden bg-gray-50 md:w-32 md:flex-shrink-0"
  >
    <img src={mockImage} alt={item.name} class="h-full w-full object-cover" />
  </div>
  <div class="flex flex-col justify-between p-2 md:flex-1">
    <h3 class="mb-1 text-sm font-medium text-gray-900">{item.name}</h3>
    <div class="flex items-center justify-between">
      <span class="text-sm font-bold" style="color: #cd3c5d">
        ${item.price.toFixed(2)}
      </span>
      <button
        class="rounded-full p-1.5 text-white transition-colors hover:opacity-90"
        style="background-color: #cd3c5d"
        aria-label="Add {item.name} to cart"
        onclick={() =>
          addItemToOrder({
            ...item,
            quantity: 1
          })}
      >
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
