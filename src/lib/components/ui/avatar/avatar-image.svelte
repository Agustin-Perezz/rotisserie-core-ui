<script lang="ts" module>
  import { cn, type WithElementRef } from '$lib/utils.js';
  import type { HTMLImgAttributes } from 'svelte/elements';

  export type AvatarImageProps = WithElementRef<HTMLImgAttributes>;
</script>

<script lang="ts">
  let {
    class: className,
    ref = $bindable(null),
    src,
    alt = 'Avatar',
    ...restProps
  }: AvatarImageProps = $props();
</script>

<img
  bind:this={ref}
  {src}
  {alt}
  class={cn('aspect-square size-full object-cover', className)}
  {...restProps}
/>
