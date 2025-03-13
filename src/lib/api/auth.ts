import { authStore } from '../stores/auth';
import { userProfileStore } from '../stores/user';
import { urlState } from '$lib/stores/url.svelte';
// import { backendUrl } from './API_URL';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  user_id?: string;
  token?: string;
  message?: string;
  error?: string;
}

/**
 * Middleware to handle API requests
 */
async function apiRequest(endpoint: string, options: RequestInit): Promise<AuthResponse> {
  
    const API_URL = `http://${urlState.url}:3000/api/secure/auth`;
    try {
      const response = await fetch(`${API_URL}${endpoint}`, options);
      const data = await response.json();
      if (response.ok && data.status === 0) {
        return data;
      } else {
        return { 
          status: data.status || 1, 
          error: data.error || 'Request failed' 
        };
      }
    } catch (error) {
      console.error('API request error:', error);
      return { status: 1, error: 'Network or server error' };
    }
}

/**
 * Handle authentication API calls
 */
export const AuthAPI = {

  /**
   * Sign in with token
   */
  async loginWithToken(): Promise<AuthResponse> {
    const { token } = authStore.getToken() ? { token: authStore.getToken() } : { token: null };

    if (!token) {
      return { status: 1, error: 'No token found' };
    }

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const data = await apiRequest('/signin', options);

    if (data.status === 0 && data.user_id && data.token) {
      authStore.setAuth(data.token, data.user_id);
    }

    return data;
  },

  /**
   * Sign in with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    };

    const data = await apiRequest('/signin', options);

    if (data.status === 0 && data.user_id && data.token) {
      authStore.setAuth(data.token, data.user_id);
    }

    return data;
  },

  /**
   * Sign up with email and password
   */
  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    };

    const data = await apiRequest('/signup', options);

    if (data.status === 0 && data.user_id && data.token) {
      authStore.setAuth(data.token, data.user_id);
    }

    return data;
  },

  /**
   * Sign out the current user
   */
  async logout(): Promise<boolean> {
    const { token } = authStore.getToken() ? { token: authStore.getToken() } : { token: null };

    if (!token) {
      authStore.clearAuth();
      userProfileStore.clearProfile();
      return true;
    }

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const data = await apiRequest('/signout', options);

    authStore.clearAuth();
    userProfileStore.clearProfile();

    return data.status === 0;
  },

  /**
   * Check if the token is valid
   */
  async verifyToken(): Promise<boolean> {
    const { token, userId } = authStore.getToken() && authStore.getUserId() 
      ? { token: authStore.getToken(), userId: authStore.getUserId() } 
      : { token: null, userId: null };

    if (!token || !userId) {
      authStore.clearAuth();
      return false;
    }

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'min-fresh=30'
      }
    };

    const data = await apiRequest(`/verify?user_id=${userId}`, options);

    if (data.status === 0) {
      return true;
    } else {
      authStore.clearAuth();
      return false;
    }
  }
};
