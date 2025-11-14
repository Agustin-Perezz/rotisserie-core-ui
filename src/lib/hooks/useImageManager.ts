import { writable } from 'svelte/store';
import { deleteItemImage } from '$lib/services/item';
import { errorToast } from '$lib/alerts/toast';
import type { TItemImage } from '$lib/types/item';

type UseImageManagerParams = {
  existingImages: TItemImage[];
  itemId?: string;
  onImagesChange?: (newImages: File[]) => void;
};

export const useImageManager = (params: UseImageManagerParams) => {
  const { existingImages, itemId, onImagesChange } = params;

  const keptImages = writable<string[]>(
    existingImages.map((image) => image.url)
  );
  const newImages = writable<File[]>([]);
  const removingImages = writable<Set<number>>(new Set());

  const handleAddImage = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      newImages.update((current) => [...current, files[0]]);
      const fileInput = event.target as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      notifyChange();
    }
  };

  const removeExistingImage = async (index: number) => {
    let imageUrl: string | undefined;
    keptImages.subscribe((current) => {
      imageUrl = current[index];
    })();

    if (itemId && imageUrl) {
      removingImages.update((current) => {
        const newSet = new Set(current);
        newSet.add(index);
        return newSet;
      });

      try {
        await deleteItemImage(itemId, imageUrl);
        keptImages.update((current) => current.filter((_, i) => i !== index));
        removingImages.update((current) => {
          const newSet = new Set(current);
          newSet.delete(index);
          return newSet;
        });
      } catch {
        errorToast('Error al eliminar la imagen');
        removingImages.update((current) => {
          const newSet = new Set(current);
          newSet.delete(index);
          return newSet;
        });
      }
    }
  };

  const removeNewImage = (index: number) => {
    newImages.update((current) => current.filter((_, i) => i !== index));
    notifyChange();
  };

  const notifyChange = () => {
    if (onImagesChange) {
      let currentImages: File[] = [];
      newImages.subscribe((current) => {
        currentImages = current;
      })();
      onImagesChange(currentImages);
    }
  };

  const getImageName = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1] || url;
  };

  return {
    keptImages,
    newImages,
    removingImages,
    handleAddImage,
    removeExistingImage,
    removeNewImage,
    getImageName
  };
};
