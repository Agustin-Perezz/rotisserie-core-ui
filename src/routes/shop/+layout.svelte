<script lang="ts">
  import Header from '$lib/components/ui/shop/Header.svelte';

  let { children } = $props();
</script>

<Header />

{@render children()}
