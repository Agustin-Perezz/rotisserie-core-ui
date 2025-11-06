<script lang="ts">
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import InputField from '$lib/components/form/InputField.svelte';
  import type { HandleSubmitForm } from '$lib/types/form';
  import type { TShopFormData } from '$lib/types/shop';
  import { shopFormSchema } from '$lib/schemas/shop.schema';
  import Button from '../ui/button/button.svelte';

  const {
    handleSubmit,
    initialValues
  }: HandleSubmitForm<TShopFormData> & { initialValues?: TShopFormData } =
    $props();

  const shopInputData = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter a description'
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      placeholder: 'Enter your location'
    }
  ];

  const { form, errors, isSubmitting } = createForm({
    initialValues: initialValues || {
      name: '',
      description: '',
      location: ''
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    extend: validator({ schema: shopFormSchema })
  });
</script>

<form use:form>
  {#each shopInputData as input (input.name)}
    <InputField
      {...input}
      error={$errors[input.name as keyof typeof $errors]?.[0] || ''}
    />
  {/each}

  <Button
    disabled={$isSubmitting}
    type="submit"
    data-testid="submit-shop-button">Submit</Button
  >
</form>
