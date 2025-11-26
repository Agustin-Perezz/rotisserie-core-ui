<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';

  interface Props {
    shopId: string;
    shopName: string;
    currentPage?: string;
  }

  let { shopId, shopName, currentPage }: Props = $props();
</script>

<Breadcrumb.Root class="my-4 flex justify-center">
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link
        href="/shops"
        onclick={(e) => {
          e.preventDefault();
          goto('/shops');
        }}
      >
        Shops
      </Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link
        href={`/shop/${shopId}/dashboard`}
        onclick={(e) => {
          e.preventDefault();
          goto(`/shop/${shopId}/dashboard`);
        }}
      >
        {shopName}
      </Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      {#if currentPage}
        <Breadcrumb.Link
          href={`/shop/${shopId}/dashboard`}
          onclick={(e) => {
            e.preventDefault();
            goto(`/shop/${shopId}/dashboard`);
          }}
        >
          Dashboard
        </Breadcrumb.Link>
      {:else}
        <Breadcrumb.Page>Dashboard</Breadcrumb.Page>
      {/if}
    </Breadcrumb.Item>
    {#if currentPage}
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>{currentPage}</Breadcrumb.Page>
      </Breadcrumb.Item>
    {/if}
  </Breadcrumb.List>
</Breadcrumb.Root>
