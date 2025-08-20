<script lang="ts">
  export let subtotal: number;
  export let shippingFee: number;
</script>

<div class="space-y-2 border-t pt-4">
  <div class="flex justify-between text-sm">
    <span class="text-gray-600">Subtotal</span>
    <span class="font-medium">${subtotal.toFixed(2)}</span>
  </div>
  <div class="flex justify-between text-sm">
    <span class="text-gray-600">Shipping Fee</span>
    <span class="font-medium">${shippingFee.toFixed(2)}</span>
  </div>
  <div class="flex justify-between text-lg font-bold">
    <span class="text-gray-800">Total</span>
    <span class="text-gray-800">AUD ${(subtotal + shippingFee).toFixed(2)}</span
    >
  </div>
</div>
