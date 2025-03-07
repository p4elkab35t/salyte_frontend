import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

export interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  isAuthenticated: false,
  loading: true
};

function createAuthStore() {
  const { subscribe, set } = writable<AuthState>(initialState);

  // Initialize from localStorage if in browser
  if (browser) {
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');
    if (savedToken && savedUserId) {
      set({
        token: savedToken,
        userId: savedUserId,
        isAuthenticated: true,
        loading: false
      });
    } else {
      set({ ...initialState, loading: false });
    }
  }

  return {
    subscribe,
    
    setAuth: (token: string, userId: string) => {
      if (browser) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
      }
      set({ token, userId, isAuthenticated: true, loading: false });
    },

    clearAuth: () => {
      if (browser) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
      set({ ...initialState, loading: false });
    },

    getToken: () => get({ subscribe }).token,
    getUserId: () => get({ subscribe }).userId,
    isAuthenticated: () => get({ subscribe }).isAuthenticated
  };
}

export const authStore = createAuthStore();
