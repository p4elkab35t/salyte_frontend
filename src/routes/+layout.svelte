<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { urlState } from '$lib/stores/url.svelte';
  import { authStore } from '$lib/stores/auth';
  import { AuthAPI } from '$lib/api/auth';
  import { SocialAPI } from '$lib/api/social';
  import { userProfileStore } from '$lib/stores/user';
  import '../app.css';
  

  let { children } = $props();
  // For tracking authentication status
  let authInitialized = $state(false);

  // Load user data when authenticated
  async function loadUserData() {
    if ($authStore.isAuthenticated && $authStore.userId) {
      try {
        // Fetch the user profile from social API
        const profileResponse = await SocialAPI.getProfile('user', $authStore.userId);
        if (profileResponse && !profileResponse.error && typeof profileResponse.ProfileID == 'string') {
          let following = await SocialAPI.getFollowing(profileResponse.ProfileID);
          const followingIDs = following.map(f => f.ProfileID);
          userProfileStore.setProfile({
            userId: $authStore.userId,
            profileId: typeof profileResponse.ProfileID === 'string' ? profileResponse.ProfileID : null,
            // email: typeof profileResponse.email === 'string' ? profileResponse.email : null,
            displayName: typeof profileResponse.Username === 'string' ? profileResponse.Username : null,
            avatar: typeof profileResponse.ProfilePictureURL === 'string' ? profileResponse.ProfilePictureURL : null,
            bio: typeof profileResponse.Bio === 'string' ? profileResponse.Bio : null,
            followingIDs: followingIDs,
          });
          console.log(userProfileStore.getProfile());
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    }
  }

  // $effect(() => {
  //   if ($authStore.isAuthenticated && $authStore.userId && $authStore.token) {
  //     goto('/feed');
  //   }
  // });

  onMount(async () => {
    if (browser) {
      // Set the current URL in the URL state store
      urlState.url = page.url.hostname.endsWith('/') ? page.url.hostname.slice(0,-1) : page.url.hostname;
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
      if (!isValid && !page.url.pathname.startsWith('/signin') && !page.url.pathname.startsWith('/signup')) {
        const returnUrl = page.url.pathname;
        goto(`/signin${returnUrl ? `?redirect=${encodeURIComponent(returnUrl)}` : ''}`);
        return;
      }
      
      // If token is valid, load user data
      if (isValid) {
        await loadUserData();
        if (page.url.pathname === '/signup' || page.url.pathname === '/signin') {
          goto('/feed');
          return
        }
        goto(page.url.pathname);
        return
      }
    }
    goto('/signin');
    return;
    // If on a protected page without auth, hooks.server.ts will redirect
  }
</script>

<!-- Main content -->
{@render children?.()}
