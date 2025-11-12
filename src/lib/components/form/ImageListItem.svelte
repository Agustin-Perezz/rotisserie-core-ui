<script lang="ts">
  import { X } from '@lucide/svelte';

  type ImageListItemProps = {
    imageName: string;
    index: number;
    bgColor: string;
    handleClickRemove: (index: number) => void;
  };

  const { imageName, index, bgColor, handleClickRemove }: ImageListItemProps =
    $props();
</script>

<li
  class="flex items-center justify-between rounded {bgColor} px-2 py-1.5 text-sm"
>
  <span class="truncate">{imageName}</span>
  <button
    type="button"
    onclick={() => handleClickRemove(index)}
    class="ml-2 text-red-500 hover:text-red-700"
    aria-label="Remove image"
  >
    <X class="h-4 w-4" />
  </button>
</li>
