import { navigating } from '$app/stores';
import { get } from 'svelte/store';
import { authStore } from '$lib/stores/auth';
import { AuthAPI } from '$lib/api/auth';

// Handle navigation events to check authentication status
navigating.subscribe(async (navigation) => {
  if (!navigation) return;
  
  // Skip auth check on initial load as SvelteKit's handle hook will manage it
  
  // List of public routes that don't need authentication
  const publicRoutes = ['/login', '/signup', '/about', '/privacy', '/terms', '/reset-password'];
  
  // Check if the destination requires authentication
  const requiresAuth = !publicRoutes.some(route => 
    navigation.to?.url.pathname === route || 
    (navigation.to?.url.pathname || '').startsWith(`${route}/`)
  );
  
  if (requiresAuth) {
    const { isAuthenticated } = get(authStore);
    
    // If authenticated but using a stored token, verify it's still valid
    if (isAuthenticated) {
      // Only verify token when not on an authentication-related page
      // and not too frequently (could add timestamp check)
      const isTokenValid = await AuthAPI.verifyToken();
      
      if (!isTokenValid && navigation.to) {
        // Redirect to login page with return URL
        window.location.href = `/login?redirect=${encodeURIComponent(navigation.to.url.pathname)}`;
        return;
      }
    }
    // If not authenticated, handle in the server hook
  }
});
