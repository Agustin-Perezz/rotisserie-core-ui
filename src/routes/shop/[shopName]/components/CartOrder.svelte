<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import OrderItem from './OrderItem.svelte';
  import OrderCosts from './OrderCosts.svelte';
  import { useOrder } from '$lib/hooks/useOrder.js';
  import { ShoppingCart } from '@lucide/svelte';
  import { getAccessToken } from '$lib/services/auth/index.js';
  import { navigateToLoginWithRedirect } from '$lib/utils/navigation.js';
  import { page } from '$app/state';

  export let shopId: string;
  export let ownerId: string;

  const {
    order,
    showPayment,
    shippingFee,
    handleQuantityChange,
    getSubtotal,
    getTotal,
    handleConfirmOrder
  } = useOrder(shopId, ownerId);

  const onConfirmClick = async () => {
    const token = await getAccessToken();
    if (!token) {
      navigateToLoginWithRedirect(page.url.pathname);
      return;
    }
    handleConfirmOrder($order);
  };
</script>

<div class="mt-6">
  <Dialog.Root>
    <Dialog.Trigger
      class="relative rounded-full bg-gray-100 p-3 transition-all hover:shadow-xl"
    >
      <ShoppingCart class="h-6 w-6 text-gray-700" />
      {#if $order?.items.length > 0}
        <span
          class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-white"
        >
          {$order.items.length}
        </span>
      {/if}
    </Dialog.Trigger>
    <Dialog.Content
      class="max-h-[80vh] overflow-x-hidden overflow-y-auto sm:max-w-[425px]"
    >
      <Dialog.Header>
        <Dialog.Title class="text-left text-lg font-bold text-gray-800"
          >{$showPayment ? 'Pago' : 'Resumen del Pedido'}</Dialog.Title
        >
      </Dialog.Header>

      <div class="space-y-4 py-4">
        {#if !$order || $order.items.length === 0}
          <div class="py-8 text-center text-gray-500">
            Tu carrito está vacío
          </div>
        {:else if $showPayment}
          <div class="space-y-4">
            <div class="text-center">
              <h3 class="text-lg font-semibold text-gray-800">
                Completa tu Pago
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

          <OrderCosts
            subtotal={getSubtotal($order)}
            shippingFee={$shippingFee}
          />
        {/if}
      </div>

      <Dialog.Footer>
        {#if $showPayment}
          <Button
            class="w-full rounded-lg bg-gray-500 py-3 font-bold text-white hover:bg-gray-600"
            onclick={() => showPayment.set(false)}
          >
            Volver al Pedido
          </Button>
        {:else}
          <Button
            class="w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
            onclick={onConfirmClick}
            disabled={!$order || $order.items.length === 0}
          >
            Confirmar Pedido
          </Button>
        {/if}
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>
