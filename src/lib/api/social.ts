import { authStore } from '../stores/auth';
import { urlState } from '$lib/stores/url.svelte';
// import { profile } from 'console';
// import { backendUrl } from './API_URL';



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
  body?: object,
  nocache: boolean=false,
): Promise<ApiResponse> {
    const token = authStore.getToken();
    const localUserID = authStore.getUserId();

    const API_URL = `http://${urlState.url}:3000/api/social`;
    
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
          'Content-Type': 'application/json',
          'Cache-Control': `${nocache?"no-cache":"min-fresh=30"}`
        },
        body: body ? JSON.stringify(body) : undefined
      });

      const data = await response.json();
      // if data contains error field
      if(data === null){
        return data;
    }
      if('error' in data) {
        throw(new Error(data.error));
      }
      return data;
    } catch (error) {
      console.error(`API error (${endpoint}):`, error);
      return { status: 500, error: 'Network or server error' };
    }
}


interface CommentData {
  ProfileID: string;
  PostID: string;
  Content: string;
}

interface postData {
  ProfileID?: string;
  PostID?: string;
  Content: string;
  Visibility?: string;
  CommunityID?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

/**
 * Social API client
 */
export const SocialAPI = {
  /**
   * Get user profile. If an override is provided, use it.
   */
  async getProfile(switchUserProfile: string, ID: string, nocache?:boolean): Promise<ApiResponse> {
    return authFetch(`/profile?${switchUserProfile}ID=${ID}`, undefined, undefined, nocache);
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
    return authFetch(`/follow?profileID=${targetUserId}`, 'POST');
  },
  
  /**
   * Unfollow a user
   */
  async unfollowUser(targetUserId: string): Promise<ApiResponse> {
    return authFetch(`/follow?profileID=${targetUserId}`, 'DELETE');
  },

  /**
   * Get following list
   */

  async getFollowing(profileID: string): Promise<ApiResponse> {
    return authFetch(`/following?profileID=${profileID}`, 'GET');
  },

  /**
   * Get followers list
   */
  async getFollowers(profileID: string): Promise<ApiResponse> {
    return authFetch(`/followers?profileID=${profileID}`, 'GET');
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

  async getPost(postId: string, nocache: boolean=true): Promise<ApiResponse> {
    return authFetch(`/post?postID=${postId}`, undefined, undefined, nocache);
  },

  /**
   * Get all posts by a user
   * Pass profileID as a query parameter.
   */

  async getUserPosts(profileID: string, nocache:boolean=true): Promise<ApiResponse> {
    return authFetch(`/post/user?profileID=${profileID}`, undefined, undefined, nocache);
  },

  /**
   * Get comments for a post
   * Pass postId as a query parameter.
   */

  async getComments(postId: string, nocache?:boolean): Promise<ApiResponse> {
    return authFetch(`/post/comments?postID=${postId}`, undefined, undefined, nocache);
  },
  
  /**
   * Get posts.
   * When filtering by user, use the query key "profileID" (as expected by backend).
   */
  async getPosts(options: { userId?: string, communityId?: string, page?: number, limit?: number } = {}, nocache: boolean=true): Promise<ApiResponse> {
    const params = new URLSearchParams();
    if (options.userId) params.append('profileID', options.userId);
    if (options.communityId) params.append('communityID', options.communityId);
    if (options.page || options.page===0) params.append('page', options.page.toString());
    if (options.limit) params.append('limit', options.limit.toString());
    return authFetch(`/post?${params.toString()}`, undefined, undefined, nocache);
  },
  
  /**
   * Create post
   */
  async createPost(postData: postData): Promise<ApiResponse> {
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

  async addComment(data: CommentData): Promise<ApiResponse> {
    return authFetch(`/post/comment`, 'POST', data );
  },
  
  /**
   * Update comment
   */
  async updateComment(commentId: string, content: string): Promise<ApiResponse> {
    return authFetch(`/post/comment?commentID=${commentId}`, 'PUT', { content });
  },
  
  /**
   * Delete comment
   */
  async deleteComment(commentId: string): Promise<ApiResponse> {
    return authFetch(`/post/comment?commentID=${commentId}`, 'DELETE', { commentId });
  },
  
  /**
   * Get likes for a post
   */
  async getLikes(postId: string, nocache?:boolean): Promise<ApiResponse> {
    return authFetch(`/post/likes?postID=${postId}`, undefined, undefined, nocache);
  },
  
  /**
   * Like a post
   */
  async likePost(postId: string): Promise<ApiResponse> {
    return authFetch(`/post/like?postID=${postId}`, 'POST');
  },
  
  /**
   * Unlike a post
   */
  async unlikePost(postId: string): Promise<ApiResponse> {
    return authFetch(`/post/like?postID=${postId}`, 'DELETE');
  }
};
