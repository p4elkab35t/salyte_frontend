import type { PageLoad } from './$types';
import { SocialAPI } from '$lib/api/social';

export const load: PageLoad = async ({ params }) => {
	// Fetch profile info from API instead of mockData
	const profileResponse = SocialAPI.getProfile('profile', params.profileID);

	// Fetch posts by this profile from API
	const postsResponse = SocialAPI.getPosts({userId: params.profileID});
	return {
		profile: profileResponse,
		posts: postsResponse
	};
};