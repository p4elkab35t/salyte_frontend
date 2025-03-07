import { writable } from 'svelte/store';
import { authStore } from '../stores/auth';
import { browser } from '$app/environment';

export interface Message {
  id: string;
  sender_id: string;
  content: string;
  timestamp: string;
  read?: boolean;
  reactions?: Record<string, string[]>;
}

export interface ChatState {
  connected: boolean;
  messages: Message[];
  error: string | null;
}

export function createChatStore(chatId: string) {
  const { subscribe, update } = writable<ChatState>({
    connected: false,
    messages: [],
    error: null
  });

  let socket: WebSocket | null = null;
  let reconnectInterval: number | undefined = undefined;
  
  function connect() {
    if (!browser) return;
    
    const token = authStore.getToken();
    if (!token) {
      update(state => ({ ...state, error: 'Authentication required' }));
      return;
    }

    // Close existing connection if any
    if (socket) socket.close();

    // Create WebSocket connection with query parameters
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    socket = new WebSocket(`${protocol}//${host}/api?token=${token}&chatID=${chatId}`);

    socket.onopen = () => {
      update(state => ({ ...state, connected: true, error: null }));
      if (reconnectInterval !== undefined) {
        clearInterval(reconnectInterval);
      }
    };

    socket.onclose = (event) => {
      update(state => ({ ...state, connected: false }));
      
      // Attempt to reconnect if closure wasn't intentional
      if (!event.wasClean) {
        reconnectInterval = setInterval(() => {
          connect();
        }, 5000);
      }
    };

    socket.onerror = () => {
      update(state => ({ ...state, error: 'WebSocket connection error' }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'newMessage':
          update(state => ({
            ...state,
            messages: [...state.messages, data.message].sort(
              (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            )
          }));
          break;
          
        case 'editedMessage':
          update(state => ({
            ...state,
            messages: state.messages.map(msg => 
              msg.id === data.message.id ? data.message : msg
            )
          }));
          break;
          
        case 'deletedMessage':
          update(state => ({
            ...state,
            messages: state.messages.filter(msg => msg.id !== data.message_id)
          }));
          break;
          
        case 'reactionApplied':
          update(state => ({
            ...state,
            messages: state.messages.map(msg => {
              if (msg.id === data.message_id) {
                const reactions = msg.reactions || {};
                const reactionUsers = reactions[data.reaction] || [];
                if (!reactionUsers.includes(data.user_id)) {
                  return {
                    ...msg,
                    reactions: {
                      ...reactions,
                      [data.reaction]: [...reactionUsers, data.user_id]
                    }
                  };
                }
              }
              return msg;
            })
          }));
          break;
          
        case 'reactionRemoved':
          update(state => ({
            ...state,
            messages: state.messages.map(msg => {
              if (msg.id === data.message_id && msg.reactions?.[data.reaction]) {
                const reactions = { ...msg.reactions };
                reactions[data.reaction] = reactions[data.reaction].filter(
                  id => id !== data.user_id
                );
                if (reactions[data.reaction].length === 0) {
                  delete reactions[data.reaction];
                }
                return { ...msg, reactions };
              }
              return msg;
            })
          }));
          break;
          
        case 'messageRead':
          update(state => ({
            ...state,
            messages: state.messages.map(msg => 
              msg.id === data.message_id ? { ...msg, read: true } : msg
            )
          }));
          break;
          
        case 'error':
          update(state => ({ ...state, error: data.message }));
          break;
      }
    };
  }

  function disconnect() {
    if (socket) {
      socket.close();
      socket = null;
    }
    
    if (reconnectInterval) {
      clearInterval(reconnectInterval);
      reconnectInterval = undefined;
    }
    
    update(state => ({ ...state, connected: false }));
  }

  function sendMessage(content: string) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      update(state => ({ ...state, error: 'Not connected to chat' }));
      return false;
    }
    
    socket.send(JSON.stringify({
      type: 'send',
      chat_id: chatId,
      message: content
    }));
    
    return true;
  }

  function editMessage(messageId: string, content: string) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return false;
    
    socket.send(JSON.stringify({
      type: 'edit',
      message_id: messageId,
      message: content
    }));
    
    return true;
  }

  function deleteMessage(messageId: string) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return false;
    
    socket.send(JSON.stringify({
      type: 'delete',
      message_id: messageId
    }));
    
    return true;
  }

  function addReaction(messageId: string, reaction: string) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return false;
    
    socket.send(JSON.stringify({
      type: 'reactionApply',
      message_id: messageId,
      reaction
    }));
    
    return true;
  }

  function removeReaction(messageId: string, reaction: string) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return false;
    
    socket.send(JSON.stringify({
      type: 'reactionRemove',
      message_id: messageId,
      reaction
    }));
    
    return true;
  }

  function markAsRead(messageId: string) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return false;
    
    socket.send(JSON.stringify({
      type: 'read',
      message_id: messageId
    }));
    
    return true;
  }

  return {
    subscribe,
    connect,
    disconnect,
    sendMessage,
    editMessage,
    deleteMessage,
    addReaction,
    removeReaction,
    markAsRead,
    setInitialMessages: (messages: Message[]) => {
      update(state => ({
        ...state,
        messages
      }));
    }
  };
}
