<script lang="ts">
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import InputField from '$lib/components/form/InputField.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { createItemSchema } from '$lib/schemas/item.schema';
  import { page } from '$app/state';
  import type { TItem, TItemFormData } from '$lib/types/item';
  import MultipleImageField from '$lib/components/form/MultipleImageField.svelte';

  type Props = {
    handleSubmit: (values: TItemFormData) => Promise<void>;
    initialValues?: TItem;
  };

  const shopId = page.params.shopId;

  const { handleSubmit, initialValues }: Props = $props();

  let newImages = $state<File[]>([]);

  const itemInputData = [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      placeholder: 'Ingrese el nombre del producto'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      placeholder: 'Ingrese una descripción (opcional)'
    },
    {
      name: 'price',
      type: 'number',
      label: 'Precio',
      placeholder: 'Ingrese el precio'
    }
  ];

  const { form, errors, isSubmitting } = createForm<TItemFormData>({
    initialValues: {
      id: initialValues?.id || undefined,
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      price: initialValues?.price || 0,
      shopId: shopId
    },
    onSubmit: async (values) => {
      const formData: TItemFormData = {
        ...values,
        images: newImages
      };
      await handleSubmit(formData);
    },
    extend: validator({ schema: createItemSchema })
  });

  const handleImagesChange = (newImgs: File[]) => {
    newImages = newImgs;
  };
</script>

<form use:form>
  {#each itemInputData as input (input.name)}
    <InputField
      {...input}
      error={$errors[input.name as keyof typeof $errors]?.[0] || ''}
    />
  {/each}

  <MultipleImageField
    name="images"
    label="Imágenes (opcional)"
    existingImages={initialValues?.images || []}
    itemId={initialValues?.id}
    onImagesChange={handleImagesChange}
    error={$errors.images?.[0] || ''}
  />

  <Button
    type="submit"
    disabled={$isSubmitting}
    data-testid="submit-item-button"
    >{initialValues ? 'Actualizar Producto' : 'Crear Producto'}</Button
  >
</form>
