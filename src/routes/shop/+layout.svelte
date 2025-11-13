<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$lib/components/ui/shop/Header.svelte';
  import LoadingSpinner from '$lib/components/ui/loading-spinner.svelte';
  import { isAuthenticated, isAuthLoading } from '$lib/stores/auth-store';
  import { navigateToLogin } from '$lib/utils/navigation';
  import { page } from '$app/state';

  let { children } = $props();

  onMount(() => {
    const unsubscribe = isAuthLoading.subscribe((loading) => {
      if (
        !loading &&
        !$isAuthenticated &&
        page.url.pathname.includes('/dashboard')
      ) {
        navigateToLogin();
      }
    });

    return unsubscribe;
  });
</script>

<Header />

{#if page.url.pathname.includes('/dashboard')}
  {#if $isAuthLoading}
    <LoadingSpinner />
  {:else if $isAuthenticated}
    {@render children()}
  {/if}
{:else}
  {@render children()}
{/if}
