<script lang="ts">
  export let subtotal: number;
  export let shippingFee: number;
</script>

<div class="space-y-3 border-t border-gray-200 pt-4">
  <div class="flex items-center justify-between">
    <span class="text-sm text-gray-600">Subtotal</span>
    <span class="text-sm font-medium text-gray-800">${subtotal.toFixed(2)}</span
    >
  </div>
  <div class="flex items-center justify-between">
    <span class="text-sm text-gray-600">Shipping Fee</span>
    <span class="text-sm font-medium text-gray-800"
      >${shippingFee.toFixed(2)}</span
    >
  </div>
  <div class="flex items-center justify-between border-t border-gray-200 pt-2">
    <span class="text-lg font-bold text-gray-800">Total</span>
    <span class="text-lg font-bold text-gray-800"
      >AUD ${(subtotal + shippingFee).toFixed(2)}</span
    >
  </div>
</div>
