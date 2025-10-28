import { writable, derived } from 'svelte/store';
import type { TShop } from '$lib/types/shop';

interface ShopState {
  shop: TShop | null;
  loading: boolean;
  error: string | null;
}

const initialState: ShopState = {
  shop: null,
  loading: false,
  error: null
};

function createShopStore() {
  const { subscribe, set, update } = writable<ShopState>(initialState);

  return {
    subscribe,
    setShop: (shop: TShop) =>
      update((state) => ({ ...state, shop, error: null })),
    setLoading: (loading: boolean) =>
      update((state) => ({ ...state, loading })),
    setError: (error: string) =>
      update((state) => ({ ...state, error, loading: false })),
    clearShop: () => set(initialState),
    reset: () => set(initialState)
  };
}

export const shopStore = createShopStore();

export const currentShop = derived(shopStore, ($shopStore) => $shopStore.shop);
export const isShopLoading = derived(
  shopStore,
  ($shopStore) => $shopStore.loading
);
export const shopError = derived(shopStore, ($shopStore) => $shopStore.error);
