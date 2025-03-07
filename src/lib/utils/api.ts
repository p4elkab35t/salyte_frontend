import { authStore } from '../stores/auth';

/**
 * General API utility for adding auth headers and handling responses
 */
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = authStore.getToken();
  
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  return fetch(url, {
    ...options,
    headers
  });
}

/**
 * Helper to add userID to URL
 */
export function addUserIdToUrl(url: URL): URL {
  const userId = authStore.getUserId();
  if (userId) {
    url.searchParams.set('user_id', userId);
  }
  return url;
}

/**
 * Check if a response indicates authentication failure
 */
export function isAuthError(response: Response): boolean {
  return response.status === 401;
}

/**
 * Handle authentication errors consistently
 */
export async function handleAuthError(response: Response): Promise<unknown> {
  if (isAuthError(response)) {
    // Clear authentication
    authStore.clearAuth();
    
    // Redirect to login if needed
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    
    return { error: 'Authentication required' };
  }
  
  return response.json();
}
