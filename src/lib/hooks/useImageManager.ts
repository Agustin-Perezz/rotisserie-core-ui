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

  let keptImages = $state<string[]>(existingImages.map((image) => image.url));
  let newImages = $state<File[]>([]);

  const handleAddImage = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      newImages = [...newImages, files[0]];
      const fileInput = event.target as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      notifyChange();
    }
  };

  const removeExistingImage = async (index: number) => {
    const imageUrl = keptImages[index];

    if (itemId && imageUrl) {
      try {
        await deleteItemImage(itemId, imageUrl);
        keptImages = keptImages.filter((_, i) => i !== index);
      } catch {
        errorToast('Error al eliminar la imagen');
      }
    }
  };

  const removeNewImage = (index: number) => {
    newImages = newImages.filter((_, i) => i !== index);
    notifyChange();
  };

  const notifyChange = () => {
    if (onImagesChange) {
      onImagesChange(newImages);
    }
  };

  const getImageName = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1] || url;
  };

  return {
    get keptImages() {
      return keptImages;
    },
    get newImages() {
      return newImages;
    },
    handleAddImage,
    removeExistingImage,
    removeNewImage,
    getImageName
  };
};
