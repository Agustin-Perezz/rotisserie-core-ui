import { writable, derived, get } from 'svelte/store';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { firebaseApp } from '$lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null
};

export const auth = getAuth(firebaseApp);

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  onAuthStateChanged(auth, (user) => {
    update((state) => ({ ...state, user, loading: false }));
  });

  return {
    subscribe,
    setUser: (user: User | null) =>
      update((state) => ({ ...state, user, error: null })),
    setLoading: (loading: boolean) =>
      update((state) => ({ ...state, loading })),
    setError: (error: string) =>
      update((state) => ({ ...state, error, loading: false })),
    clearUser: () => set({ ...initialState, loading: false }),
    reset: () => set(initialState)
  };
}

export const authStore = createAuthStore();

export const currentUser = derived(authStore, ($authStore) => $authStore.user);
export const isAuthLoading = derived(
  authStore,
  ($authStore) => $authStore.loading
);
export const authError = derived(authStore, ($authStore) => $authStore.error);
export const isAuthenticated = derived(
  authStore,
  ($authStore) => !!$authStore.user
);

export const getCurrentUser = (): User | null => {
  return get(authStore).user;
};
