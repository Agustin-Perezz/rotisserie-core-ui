<script lang="ts">
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import InputField from '$lib/components/form/InputField.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { createItemSchema } from '$lib/schemas/item.schema';
  import { page } from '$app/state';
  import type { TItem, TItemFormData } from '$lib/types/item';
  import ImageField from '$lib/components/form/ImageField.svelte';

  type Props = {
    handleSubmit: (values: TItemFormData) => Promise<void>;
    initialValues?: TItem;
  };

  const shopId = page.params.shopId;

  const { handleSubmit, initialValues }: Props = $props();

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
    onSubmit: handleSubmit,
    extend: validator({ schema: createItemSchema })
  });
</script>

<form use:form>
  {#each itemInputData as input (input.name)}
    <InputField
      {...input}
      error={$errors[input.name as keyof typeof $errors]?.[0] || ''}
    />
  {/each}

  <ImageField
    id="image"
    name="image"
    label="Imagen (opcional)"
    error={$errors.image?.[0] || ''}
  />

  <Button
    type="submit"
    disabled={$isSubmitting}
    data-testid="submit-item-button">Crear Producto</Button
  >
</form>
