<script lang="ts">
  interface Props {
    size?: 'sm' | 'md' | 'lg';
  }

  let { size = 'md' }: Props = $props();

  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };
</script>

<div class="flex h-screen items-center justify-center">
  <div
    class="{sizeClasses[
      size
    ]} border-muted-foreground animate-spin rounded-full border-t-transparent"
    role="status"
    aria-label="Cargando"
  ></div>
</div>
