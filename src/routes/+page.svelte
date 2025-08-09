<script lang="ts">
  import ShopForm from '$lib/components/shop/ShopForm.svelte';

  type Test = {
    name: string;
    description: string;
    location: string;
  };

  const handleSubmit = (values: Test) => {
    console.log('Form submitted:', values);
  };
</script>

<ShopForm {handleSubmit} />
