<script lang="ts">
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import InputField from '$lib/components/form/InputField.svelte';
  import type { HandleSubmitForm } from '$lib/types/form';
  import type { TShop } from '$lib/types/shop';
  import { shopFormSchema } from '$lib/schemas/shop.schema';

  const { handleSubmit }: HandleSubmitForm<TShop> = $props();

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
    initialValues: {
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
  {#each shopInputData as { name, type, label, placeholder } (name)}
    <InputField
      {name}
      {label}
      {type}
      {placeholder}
      error={$errors[name as keyof typeof $errors]?.[0] || ''}
    />
  {/each}

  <button disabled={$isSubmitting} type="submit">Submit</button>
</form>
