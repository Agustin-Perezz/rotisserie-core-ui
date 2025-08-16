import { writable } from 'svelte/store';

export function useFetch<T>(asyncFn: () => Promise<T>, immediate = true) {
  const data = writable<T | null>(null);
  const loading = writable(false);
  const error = writable<Error | null>(null);

  async function run() {
    loading.set(true);
    error.set(null);
    try {
      data.set(await asyncFn());
    } catch (err) {
      error.set(err as Error);
    } finally {
      loading.set(false);
    }
  }

  if (immediate) run();

  return { data, loading, error, run };
}
