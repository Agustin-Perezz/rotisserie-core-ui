<script lang="ts">
  import { Plus } from '@lucide/svelte';
  import ImageListItem from './ImageListItem.svelte';
  import type { TItemImage } from '$lib/types/item';
  import { useImageManager } from '$lib/hooks/useImageManager';

  type MultipleImageFieldProps = {
    name: string;
    label: string;
    existingImages?: TItemImage[];
    itemId?: string;
    error?: string;
    onImagesChange?: (newImages: File[]) => void;
  };

  const {
    name,
    label,
    existingImages = [],
    itemId,
    error,
    onImagesChange
  }: MultipleImageFieldProps = $props();

  let fileInputRef: HTMLInputElement | null = $state(null);

  const {
    keptImages,
    newImages,
    removingImages,
    handleAddImage,
    removeExistingImage,
    removeNewImage,
    getImageName
  } = useImageManager({ existingImages, itemId, onImagesChange });
</script>

<div class="mb-4">
  <label for="file-input-{name}" class="mb-1 block text-sm font-medium"
    >{label}</label
  >

  {#if $keptImages.length > 0}
    <div class="mb-2 rounded border border-gray-200 p-2">
      <p class="mb-2 text-xs text-gray-600">Imágenes existentes:</p>
      <ul class="space-y-1">
        {#each $keptImages as image, index (image)}
          <ImageListItem
            imageName={getImageName(image)}
            {index}
            bgColor="bg-gray-50"
            handleClickRemove={removeExistingImage}
            isRemoving={$removingImages.has(index)}
          />
        {/each}
      </ul>
    </div>
  {/if}

  {#if $newImages.length > 0}
    <div class="mb-2 rounded border border-gray-200 p-2">
      <p class="mb-2 text-xs text-gray-600">Nuevas imágenes:</p>
      <ul class="space-y-1">
        {#each $newImages as image, index (`${image.name}-${image.lastModified}`)}
          <ImageListItem
            {index}
            imageName={image.name}
            bgColor="bg-blue-50"
            handleClickRemove={removeNewImage}
          />
        {/each}
      </ul>
    </div>
  {/if}

  <input
    type="file"
    bind:this={fileInputRef}
    onchange={handleAddImage}
    accept="image/jpeg,image/png,image/webp"
    class="hidden"
    id="file-input-{name}"
  />

  <button
    type="button"
    onclick={() => fileInputRef?.click()}
    class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
  >
    <Plus class="mr-2 h-4 w-4" />
    Agregar Imagen
  </button>

  {#if error}
    <p class="mt-1 text-sm text-red-500">{error}</p>
  {/if}
</div>
