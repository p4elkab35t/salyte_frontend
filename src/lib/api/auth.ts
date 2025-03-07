import { authStore } from '../stores/auth';
import { userProfileStore } from '../stores/user';

const API_URL = '/api/secure/auth';

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
 * Handle authentication API calls
 */
export const AuthAPI = {
  /**
   * Sign in with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === 0) {
        authStore.setAuth(data.token, data.user_id);
        return data;
      } else {
        return { 
          status: data.status || 1, 
          error: data.error || 'Authentication failed' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { status: 1, error: 'Network or server error' };
    }
  },
  
  /**
   * Sign up with email and password
   */
  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === 0) {
        // Usually you wouldn't auto-login after signup, but if your API works this way:
        authStore.setAuth(data.token, data.user_id);
        return data;
      } else {
        return { 
          status: data.status || 1, 
          error: data.error || 'Registration failed' 
        };
      }
    } catch (error) {
      console.error('SignUp error:', error);
      return { status: 1, error: 'Network or server error' };
    }
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
    
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      // Always clear auth on frontend even if server failed
      authStore.clearAuth();
      userProfileStore.clearProfile();
      
      return response.ok && data.status === 0;
    } catch (error) {
      console.error('Logout error:', error);
      authStore.clearAuth();
      userProfileStore.clearProfile();
      return false;
    }
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
    
    try {
      const response = await fetch(`${API_URL}/verify?user_id=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === 0) {
        return true;
      } else {
        authStore.clearAuth();
        return false;
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }
};
