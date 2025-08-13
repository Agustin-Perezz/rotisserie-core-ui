<script lang="ts">
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import InputField from '$lib/components/form/InputField.svelte';
  import type { HandleSubmitForm } from '$lib/types/form';
  import Button from '$lib/components/ui/button/button.svelte';
  import { createItemSchema } from '$lib/schemas/item.schema';
  import { page } from '$app/state';
  import type { TCreateItemFormData } from '$lib/types/item';
  import ImageField from '$lib/components/form/ImageField.svelte';

  const shopId = page.params.shopId;

  const { handleSubmit }: HandleSubmitForm<TCreateItemFormData> = $props();

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

  const { form, errors, isSubmitting } = createForm<TCreateItemFormData>({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      shopId: shopId
    },
    onSubmit: handleSubmit,
    extend: validator({ schema: createItemSchema })
  });
</script>

<form use:form>
  {#each itemInputData as { name, type, label, placeholder } (name)}
    <InputField
      {name}
      {label}
      {type}
      {placeholder}
      error={$errors[name as keyof typeof $errors]?.[0] || ''}
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
