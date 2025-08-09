<script lang="ts">
  type InputFieldProps = {
    name: string;
    type: string;
    placeholder?: string;
    label: string;
    error?: string;
    className?: string;
  };

  let {
    label = '',
    error = '',
    className = '',
    ...inputProps
  }: InputFieldProps = $props();
</script>

<div class="mb-4">
  <label
    for={inputProps.name}
    class="mb-1 block text-sm font-medium text-gray-700"
  >
    {label}
  </label>
  <input
    id={inputProps.name}
    {...inputProps}
    class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none {className} {error &&
      'border-red-500'}"
  />
  {#if error}
    <p class="mt-1 text-sm text-red-600">{error}</p>
  {/if}
</div>
