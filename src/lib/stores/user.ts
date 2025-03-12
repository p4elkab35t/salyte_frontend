import { writable, get } from 'svelte/store';

export interface UserProfile {
  userId: string | null;
  profileId: string | null;
  email: string | null;
  displayName: string | null;
  avatar: string | null;
  bio: string | null;
  // Add other profile fields as needed
}

const initialProfile: UserProfile = {
  userId: null,
  profileId: null,
  email: null,
  displayName: null,
  avatar: null,
  bio: null
};

function createUserProfileStore() {
  const { subscribe, set, update } = writable<UserProfile>(initialProfile);

  return {
    subscribe,
    
    setProfile: (profile: Partial<UserProfile>) => {
      update(current => ({ ...current, ...profile }));
    },
    
    clearProfile: () => {
      set(initialProfile);
    },
    
    getProfile: () => get({ subscribe })
  };
}

export const userProfileStore = createUserProfileStore();
