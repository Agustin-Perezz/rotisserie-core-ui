<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import {
    orderStore,
    updateItemQuantity,
    removeItemFromOrder
  } from '$lib/stores/order-store.js';
  import { onMount } from 'svelte';
  import type { TOrderContext } from '$lib/types/order';
  import OrderItem from './OrderItem.svelte';
  import OrderCosts from './OrderCosts.svelte';

  let order: TOrderContext;
  let shippingFee = 0;

  onMount(() => {
    const unsubscribe = orderStore.subscribe((orderData) => {
      order = orderData;
    });

    return unsubscribe;
  });

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItemFromOrder(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const getSubtotal = () => {
    return order?.totalPrice ?? 0;
  };

  const getTotal = () => {
    return getSubtotal() + shippingFee;
  };

  const confirmOrder = () => {
    console.log('Order confirmed:', { items: order, total: getTotal() });
  };
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}
    >View Cart ({order?.items.length})</Dialog.Trigger
  >
  <Dialog.Content
    class="max-h-[80vh] overflow-x-hidden overflow-y-auto sm:max-w-[425px]"
  >
    <Dialog.Header>
      <Dialog.Title class="text-left text-lg font-bold text-gray-800"
        >Order Summary</Dialog.Title
      >
    </Dialog.Header>

    <div class="space-y-4 py-4">
      {#if !order || order.items.length === 0}
        <div class="py-8 text-center text-gray-500">Your cart is empty</div>
      {:else}
        <div class="space-y-4">
          {#each order.items as item (item.id)}
            <OrderItem {item} onQuantityChange={handleQuantityChange} />
          {/each}
        </div>

        <OrderCosts subtotal={getSubtotal()} {shippingFee} />
      {/if}
    </div>

    <Dialog.Footer>
      <Button
        class="w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
        onclick={confirmOrder}
        disabled={!order || order.items.length === 0}
      >
        Confirm Order
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
