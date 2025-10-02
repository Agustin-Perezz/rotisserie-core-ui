<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import OrderItem from './OrderItem.svelte';
  import OrderCosts from './OrderCosts.svelte';
  import { useOrder } from '$lib/hooks/useOrder.js';

  const {
    order,
    showPayment,
    shippingFee,
    handleQuantityChange,
    getSubtotal,
    getTotal,
    confirmOrder
  } = useOrder();
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}
    >View Cart ({$order?.items.length})</Dialog.Trigger
  >
  <Dialog.Content
    class="max-h-[80vh] overflow-x-hidden overflow-y-auto sm:max-w-[425px]"
  >
    <Dialog.Header>
      <Dialog.Title class="text-left text-lg font-bold text-gray-800"
        >{$showPayment ? 'Payment' : 'Order Summary'}</Dialog.Title
      >
    </Dialog.Header>

    <div class="space-y-4 py-4">
      {#if !$order || $order.items.length === 0}
        <div class="py-8 text-center text-gray-500">Your cart is empty</div>
      {:else if $showPayment}
        <div class="space-y-4">
          <div class="text-center">
            <h3 class="text-lg font-semibold text-gray-800">
              Complete Your Payment
            </h3>
            <p class="text-sm text-gray-600">
              Total: ${(getTotal($order, $shippingFee) / 100).toFixed(2)}
            </p>
          </div>
          <div id="paymentBrick_container"></div>
        </div>
      {:else}
        <div class="space-y-4">
          {#each $order.items as item (item.id)}
            <OrderItem {item} onQuantityChange={handleQuantityChange} />
          {/each}
        </div>

        <OrderCosts subtotal={getSubtotal($order)} shippingFee={$shippingFee} />
      {/if}
    </div>

    <Dialog.Footer>
      {#if $showPayment}
        <Button
          class="w-full rounded-lg bg-gray-500 py-3 font-bold text-white hover:bg-gray-600"
          onclick={() => showPayment.set(false)}
        >
          Back to Order
        </Button>
      {:else}
        <Button
          class="w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
          onclick={() => confirmOrder($order)}
          disabled={!$order || $order.items.length === 0}
        >
          Confirm Order
        </Button>
      {/if}
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
