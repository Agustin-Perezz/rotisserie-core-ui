<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import { addItemToOrder } from '$lib/stores/order-store';
  import type { TItem } from '$lib/types/item';

  export let item: TItem;
</script>

<Card.Root
  class="overflow-hidden transition-shadow duration-200 hover:shadow-lg"
>
  <div class="aspect-video overflow-hidden">
    <img src={item.image} alt={item.name} class="h-full w-full object-cover" />
  </div>
  <Card.CardHeader class="pb-3">
    <Card.CardTitle class="text-lg">{item.name}</Card.CardTitle>
    <Card.CardDescription class="text-sm text-gray-600">
      {item.description}
    </Card.CardDescription>
  </Card.CardHeader>
  <Card.CardContent class="pt-0">
    <div class="flex items-center justify-between">
      <span class="text-black-600 text-2xl font-bold">
        ${item.price.toFixed(2)}
      </span>
      <button
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        onclick={() =>
          addItemToOrder({
            ...item,
            quantity: 1
          })}
      >
        Add to Cart
      </button>
    </div>
  </Card.CardContent>
</Card.Root>
