<script lang="ts">
  type ImageFieldProps = {
    id?: string;
    name: string;
    label: string;
    error?: string;
  };

  const { id, name, label, error }: ImageFieldProps = $props();
</script>

<div class="mb-4">
  <label for={id} class="mb-1 block text-sm font-medium">{label}</label>
  <input
    type="file"
    {id}
    {name}
    accept="image/jpeg,image/png,image/webp"
    class="w-full"
  />
  {#if error}
    <p class="mt-1 text-sm text-red-500">{error}</p>
  {/if}
</div>
