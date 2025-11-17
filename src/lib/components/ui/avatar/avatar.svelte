<script lang="ts" module>
  import { cn, type WithElementRef } from '$lib/utils.js';
  import type { HTMLAttributes } from 'svelte/elements';

  export type AvatarProps = WithElementRef<HTMLAttributes<HTMLSpanElement>>;
</script>

<script lang="ts">
  let {
    class: className,
    ref = $bindable(null),
    children,
    ...restProps
  }: AvatarProps = $props();
</script>

<span
  bind:this={ref}
  class={cn(
    'relative flex size-10 shrink-0 overflow-hidden rounded-full',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</span>
