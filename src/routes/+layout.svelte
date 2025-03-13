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

  async function loadUserData() {
    if ($authStore.isAuthenticated && $authStore.userId) {
      try {
        await SocialAPI.getProfile('user', $authStore.userId).then((res)=>{
          if (res && !res.error && typeof res.ProfileID == 'string') {
            userProfileStore.setProfile({
              userId: $authStore.userId,
              profileId: typeof res.ProfileID === 'string' ? res.ProfileID : null,
              // email: typeof profileResponse.email === 'string' ? profileResponse.email : null,
              displayName: typeof res.Username === 'string' ? res.Username : null,
              avatar: typeof res.ProfilePictureURL === 'string' ? res.ProfilePictureURL : null,
              bio: typeof res.Bio === 'string' ? res.Bio : null,
            });
            console.log(userProfileStore.getProfile());
          };
          return res;
        }).then((res) => {
          // Fetch the user's followers
          try {
            SocialAPI.getFollowing(res.ProfileID).then(
              (res) => {
                if (res && !res.error && Array.isArray(res)) {
                  userProfileStore.setProfile({
                    followingIDs: res.map((follower) => follower.ProfileID),
                  });
                }
              }
            );
          } catch (error) {
            console.error('Failed to get followers:', error);
          }
        });
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    }
  }

  export async function logout() {
    await AuthAPI.logout().then(() => {
      $authStore.isAuthenticated = false;
      $authStore.userId = null;
      $authStore.token = null;
      userProfileStore.setProfile({
        userId: null,
        profileId: null,
        displayName: null,
        avatar: null,
        bio: null,
      });
    });
    goto('/');
  }

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
    if ($authStore.isAuthenticated) {
      const isValid = await AuthAPI.verifyToken();
      
      if (!isValid && !page.url.pathname.startsWith('/signin') && !page.url.pathname.startsWith('/signup')) {
        const returnUrl = page.url.pathname;
        goto(`/signin${returnUrl ? `?redirect=${encodeURIComponent(returnUrl)}` : ''}`);
        return;
      }
      
      // If token is valid, load user data
      if (isValid) {
        await loadUserData();
        if (page.url.pathname.startsWith('/signup') || page.url.pathname.startsWith('/signin')) {
          goto('/feed');
          return
        }
        goto(page.url.pathname);
        return
      }
    }
    goto('/');
    return;
    // If on a protected page without auth, hooks.server.ts will redirect
  }
</script>

<!-- Main content -->
{@render children?.()}
