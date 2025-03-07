<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { authStore } from '$lib/stores/auth';
  import { AuthAPI } from '$lib/api/auth';
  import { SocialAPI } from '$lib/api/social';
  import { userProfileStore } from '$lib/stores/user';
  import '../app.css';
  

  let { children } = $props();
  // For tracking authentication status
  let authInitialized = false;

  // Load user data when authenticated
  async function loadUserData() {
    if ($authStore.isAuthenticated && $authStore.userId) {
      try {
        // Fetch the user profile from social API
        const profileResponse = await SocialAPI.getProfile();
        if (profileResponse && !profileResponse.error) {
          userProfileStore.setProfile({
            userId: $authStore.userId,
            email: typeof profileResponse.email === 'string' ? profileResponse.email : null,
            displayName: typeof profileResponse.displayName === 'string' ? profileResponse.displayName : null,
            avatar: typeof profileResponse.avatar === 'string' ? profileResponse.avatar : null,
            bio: typeof profileResponse.bio === 'string' ? profileResponse.bio : null
          });
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    }
  }

  onMount(async () => {
    if (browser) {
      // Wait for auth store to initialize from localStorage
      if ($authStore.loading) {
        const unsubscribe = authStore.subscribe(state => {
          if (!state.loading && !authInitialized) {
            authInitialized = true;
            unsubscribe();
            initAuth();
          }
        });
      } else {
        await initAuth();
      }
    }
  });

  async function initAuth() {
    // If we have a token, verify it
    if ($authStore.isAuthenticated) {
      const isValid = await AuthAPI.verifyToken();
      
      // If invalid token, redirect to login if not already there
      if (!isValid && !$page.url.pathname.startsWith('/login')) {
        const returnUrl = $page.url.pathname;
        goto(`/login${returnUrl ? `?redirect=${encodeURIComponent(returnUrl)}` : ''}`);
        return;
      }
      
      // If token is valid, load user data
      if (isValid) {
        await loadUserData();
      }
    }
    // If on a protected page without auth, hooks.server.ts will redirect
  }
</script>

<!-- Main content -->
{@render children?.()}
