<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$lib/components/ui/shop/Header.svelte';
  import LoadingSpinner from '$lib/components/ui/loading-spinner.svelte';
  import { isAuthenticated, isAuthLoading } from '$lib/stores/auth-store';
  import { navigateToLogin } from '$lib/utils/navigation';

  let { children } = $props();

  onMount(() => {
    const unsubscribe = isAuthLoading.subscribe((loading) => {
      if (!loading && !$isAuthenticated) {
        navigateToLogin();
      }
    });

    return unsubscribe;
  });
</script>

{#if $isAuthLoading}
  <LoadingSpinner />
{:else if $isAuthenticated}
  <Header />
  {@render children()}
{/if}
