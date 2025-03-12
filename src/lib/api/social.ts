import { authStore } from '../stores/auth';

const API_URL = '127.0.0.1:3000/api/social';

interface ApiResponse {
  status?: number;
  error?: string;
  [key: string]: unknown;
}

/**
 * Helper function for authenticated API requests.
 * Appends ?userID=<logged-in id> only if not already provided.
 */
async function authFetch(
  endpoint: string, 
  method: string = 'GET', 
  body?: object
): Promise<ApiResponse> {
  const token = authStore.getToken();
  const localUserID = authStore.getUserId();
  
  if (!token || !localUserID) {
    return { status: 401, error: 'Not authenticated' };
  }
  
  // If endpoint already has any user identification, do not add another.
  const hasUserID = /userID=/i.test(endpoint) || /profileID=/i.test(endpoint);
  const connector = endpoint.includes('?') ? '&' : '?';
  const finalEndpoint = hasUserID ? endpoint : `${endpoint}${connector}userID=${localUserID}`;
  
  try {
    const url = `${API_URL}${finalEndpoint}`;
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API error (${endpoint}):`, error);
    return { status: 500, error: 'Network or server error' };
  }
}

/**
 * Social API client
 */
export const SocialAPI = {
  /**
   * Get user profile. If an override is provided, use it.
   */
  async getProfile(switchUserProfile: string, ID: string): Promise<ApiResponse> {
    return authFetch(`/profile?${switchUserProfile}ID=${ID}`);
  },
  
  /**
   * Update user profile
   */
  async updateProfile(profileData: object): Promise<ApiResponse> {
    return authFetch('/profile', 'PUT', profileData);
  },
  
  /**
   * Follow a user
   */
  async followUser(targetUserId: string): Promise<ApiResponse> {
    return authFetch('/follow', 'POST', { targetUserId });
  },
  
  /**
   * Unfollow a user
   */
  async unfollowUser(targetUserId: string): Promise<ApiResponse> {
    return authFetch('/follow', 'DELETE', { targetUserId });
  },
  
  /**
   * Get friends list
   */
  async getFriends(): Promise<ApiResponse> {
    return authFetch('/friends');
  },
  
  /**
   * Add friend
   */
  async addFriend(targetUserId: string): Promise<ApiResponse> {
    return authFetch('/friends', 'POST', { targetUserId });
  },
  
  /**
   * Get communities
   */
  async getCommunities(): Promise<ApiResponse> {
    return authFetch('/community');
  },
  
  /**
   * Create community
   */
  async createCommunity(communityData: object): Promise<ApiResponse> {
    return authFetch('/community', 'POST', communityData);
  },
  
  /**
   * Update community
   */
  async updateCommunity(communityId: string, communityData: object): Promise<ApiResponse> {
    return authFetch('/community', 'PUT', { communityId, ...communityData });
  },

  /**
   * Get single post
   * Pass postId as a query parameter.
   */

  async getPost(postId: string): Promise<ApiResponse> {
    return authFetch(`/post?postID=${postId}`);
  },

  /**
   * Get all posts by a user
   * Pass profileID as a query parameter.
   */

  async getUserPosts(profileID: string): Promise<ApiResponse> {
    return authFetch(`/post/user?profileID=${profileID}`);
  },

  /**
   * Get comments for a post
   * Pass postId as a query parameter.
   */

  async getComments(postId: string): Promise<ApiResponse> {
    return authFetch(`/post/comments?postID=${postId}`);
  },
  
  /**
   * Get posts.
   * When filtering by user, use the query key "profileID" (as expected by backend).
   */
  async getPosts(options: { userId?: string, communityId?: string, page?: number, limit?: number } = {}): Promise<ApiResponse> {
    const params = new URLSearchParams();
    if (options.userId) params.append('profileID', options.userId);
    if (options.communityId) params.append('communityID', options.communityId);
    if (options.page) params.append('page', options.page.toString());
    if (options.limit) params.append('limit', options.limit.toString());
    
    return authFetch(`/post?${params.toString()}`);
  },
  
  /**
   * Create post
   */
  async createPost(postData: object): Promise<ApiResponse> {
    return authFetch('/post', 'POST', postData);
  },
  
  /**
   * Update post.
   * Pass postId as a query parameter instead of in the body.
   */
  async updatePost(postId: string, postData: object): Promise<ApiResponse> {
    return authFetch(`/post?postID=${postId}`, 'PUT', postData);
  },
  
  /**
   * Delete post.
   * Pass postId as a query parameter.
   */
  async deletePost(postId: string): Promise<ApiResponse> {
    return authFetch(`/post?postID=${postId}`, 'DELETE');
  },
  
  /**
   * Add comment to post
   */
  async addComment(postId: string, content: string): Promise<ApiResponse> {
    return authFetch('/post/comment', 'POST', { postId, content });
  },
  
  /**
   * Update comment
   */
  async updateComment(commentId: string, content: string): Promise<ApiResponse> {
    return authFetch('/post/comment', 'PUT', { commentId, content });
  },
  
  /**
   * Delete comment
   */
  async deleteComment(commentId: string): Promise<ApiResponse> {
    return authFetch('/post/comment', 'DELETE', { commentId });
  },
  
  /**
   * Get likes for a post
   */
  async getLikes(postId: string): Promise<ApiResponse> {
    return authFetch(`/post/likes?postId=${postId}`);
  },
  
  /**
   * Like a post
   */
  async likePost(postId: string): Promise<ApiResponse> {
    return authFetch('/post/like', 'POST', { postId });
  },
  
  /**
   * Unlike a post
   */
  async unlikePost(postId: string): Promise<ApiResponse> {
    return authFetch('/post/like', 'DELETE', { postId });
  }
};
