<script lang="ts">
  import { X } from '@lucide/svelte';

  type ImageListItemProps = {
    imageName: string;
    index: number;
    bgColor: string;
    handleClickRemove: (index: number) => void;
    isRemoving?: boolean;
  };

  const {
    imageName,
    index,
    bgColor,
    handleClickRemove,
    isRemoving = false
  }: ImageListItemProps = $props();
</script>

<li
  class="flex items-center justify-between rounded px-2 py-1.5 text-sm {isRemoving
    ? 'bg-red-100 opacity-60'
    : bgColor}"
>
  <span class="truncate {isRemoving ? 'text-gray-400' : ''}">{imageName}</span>
  <button
    type="button"
    onclick={() => handleClickRemove(index)}
    disabled={isRemoving}
    class="ml-2 text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    aria-label="Remove image"
  >
    <X class="h-4 w-4" />
  </button>
</li>
