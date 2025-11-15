<script lang="ts" module>
  import { cn, type WithElementRef } from '$lib/utils.js';
  import type { HTMLAttributes } from 'svelte/elements';

  export type AvatarFallbackProps = WithElementRef<
    HTMLAttributes<HTMLSpanElement>
  >;
</script>

<script lang="ts">
  let {
    class: className,
    ref = $bindable(null),
    children,
    ...restProps
  }: AvatarFallbackProps = $props();
</script>

<span
  bind:this={ref}
  class={cn(
    'bg-muted flex size-full items-center justify-center rounded-full text-sm font-medium',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</span>
