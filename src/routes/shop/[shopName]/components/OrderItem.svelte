<script lang="ts">
  import type { TOrderItemContext } from '$lib/types/order';

  export let item: TOrderItemContext;
  export let onQuantityChange: (itemId: string, newQuantity: number) => void;
</script>

<div class="flex items-start gap-4">
  <div class="relative flex-shrink-0">
    <div
      class="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200"
    >
      {#if item.image}
        <img
          src={item.image}
          alt={item.name}
          class="h-full w-full rounded-lg object-cover"
        />
      {:else}
        <div class="h-8 w-8 rounded bg-gray-300"></div>
      {/if}
      <div
        class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white"
      >
        {item.quantity}
      </div>
    </div>
  </div>

  <div class="min-w-0 flex-1">
    <div class="truncate text-sm font-medium text-gray-800">
      {item.name}
    </div>
    <div class="text-xs text-gray-500">Brand</div>
  </div>

  <div class="flex flex-shrink-0 flex-col items-end gap-2">
    <div class="flex items-center rounded-lg border border-gray-300">
      <button
        class="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
        on:click={() => onQuantityChange(item.id, item.quantity - 1)}
      >
        -
      </button>
      <span class="px-2 py-1 text-sm text-gray-800">{item.quantity}</span>
      <button
        class="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
        on:click={() => onQuantityChange(item.id, item.quantity + 1)}
      >
        +
      </button>
    </div>
    <div class="text-sm font-bold text-gray-800">
      ${(item.price * item.quantity).toFixed(2)}
    </div>
  </div>
</div>
