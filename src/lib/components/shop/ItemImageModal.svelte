<script lang="ts">
  import { Dialog, DialogContent } from '$lib/components/ui/dialog';
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
  } from '$lib/components/ui/carousel';
  import { Button } from '$lib/components/ui/button';
  import { addItemToOrder } from '$lib/stores/order-store';
  import type { TItem } from '$lib/types/item';
  import { Plus } from '@lucide/svelte';

  let { open = $bindable(false), item }: { open?: boolean; item: TItem } =
    $props();

  const images =
    item.images && item.images.length > 0
      ? item.images
      : [{ id: 'default', url: '/default-item-image.webp' }];

  function handleAddToCart() {
    addItemToOrder({
      ...item,
      quantity: 1
    });
  }
</script>

<Dialog bind:open>
  <DialogContent class="max-w-3xl">
    <div class="flex flex-col gap-4">
      <div class="relative">
        <Carousel class="w-full">
          <CarouselContent>
            {#each images as image (image.id)}
              <CarouselItem>
                <div
                  class="flex aspect-square items-center justify-center bg-gray-50"
                >
                  <img
                    src={image.url}
                    alt={item.name}
                    class="my-4 h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            {/each}
          </CarouselContent>
          {#if images.length > 1}
            <CarouselPrevious class="left-2" />
            <CarouselNext class="right-2" />
          {/if}
        </Carousel>
      </div>

      <div class="space-y-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{item.name}</h2>
          {#if item.description}
            <p class="mt-2 text-sm text-gray-600">{item.description}</p>
          {/if}
        </div>

        <div class="flex items-center justify-between border-t pt-4">
          <span class="text-3xl font-bold text-gray-900">
            $ {item.price}
          </span>
          <Button
            onclick={handleAddToCart}
            class="flex items-center gap-2"
            size="lg"
          >
            <Plus class="h-5 w-5" />
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>
