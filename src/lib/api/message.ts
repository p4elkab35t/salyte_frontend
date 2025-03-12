import { authStore } from '../stores/auth';
import { page } from '$app/state';  
// import { backendUrl } from './API_URL';

interface ApiResponse {
  status?: number;
  error?: string;
  [key: string]: unknown;
}

/**
 * Helper function for authenticated API requests
 */
async function authFetch(
  endpoint: string, 
  method: string = 'GET', 
  body?: object
): Promise<ApiResponse> {
    const token = authStore.getToken();
    const userId = authStore.getUserId();
    
    let hostname = page.url.hostname;
    hostname = hostname.endsWith('/') ? hostname.slice(0, -1) : hostname;
    
    const API_URL = `http://${hostname}:3000/api/message`;
    
    if (!token || !userId) {
      return { status: 401, error: 'Not authenticated' };
    }
    
    try {
      // Add userID to endpoint
      const url = `${API_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}user_id=${userId}`;
      
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
 * Message API client
 */
export const MessageAPI = {
  /**
   * Get messages by chat ID
   */
  async getMessagesByChatID(chatId: string): Promise<ApiResponse> {
    return authFetch(`/getMessagesByChatID?chat_id=${chatId}`);
  },
  
  /**
   * Get unread messages
   */
  async getUnreadMessages(): Promise<ApiResponse> {
    return authFetch('/getUnreadMessages');
  },
  
  /**
   * Delete all messages in a chat
   */
  async deleteAllMessagesByChatID(chatId: string): Promise<ApiResponse> {
    return authFetch(`/deleteAllMessagesByChatID?chat_id=${chatId}`, 'POST');
  },
  
  /**
   * Get chat information
   */
  async getChat(chatId: string): Promise<ApiResponse> {
    return authFetch(`/getChat?chat_id=${chatId}`);
  },
  
  /**
   * Create a new chat
   */
  async createChat(chatData: { name: string, userIds: string[] }): Promise<ApiResponse> {
    return authFetch('/createChat', 'POST', chatData);
  },
  
  /**
   * Get all user's chats
   */
  async getAllChats(): Promise<ApiResponse> {
    return authFetch('/getAllChats');
  },
  
  /**
   * Add a user to chat
   */
  async addUserToChat(chatId: string, addedUserId: string): Promise<ApiResponse> {
    return authFetch(`/addUserToChat?chat_id=${chatId}&added_user_id=${addedUserId}`, 'POST');
  },
  
  /**
   * Remove a user from chat
   */
  async removeUserFromChat(chatId: string, removedUserId: string): Promise<ApiResponse> {
    return authFetch(`/removeUserFromChat?chat_id=${chatId}&removed_user_id=${removedUserId}`, 'POST');
  },
  
  /**
   * Get chat members
   */
  async getChatMembers(chatId: string): Promise<ApiResponse> {
    return authFetch(`/getChatMembers?chat_id=${chatId}`);
  },
  
  /**
   * Get chat by ID with messages
   */
  async getChatByID(chatId: string): Promise<ApiResponse> {
    return authFetch(`/getChatByID?chat_id=${chatId}`);
  },
  
  /**
   * Get reactions for a message
   */
  async getReactions(messageId: string): Promise<ApiResponse> {
    return authFetch(`/getReactions?message_id=${messageId}`);
  }
};
