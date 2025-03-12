import type { PageLoad } from './$types';
import { SocialAPI } from '$lib/api/social';

export const load: PageLoad = async ({ params }) => {
	// Fetch profile info from API instead of mockData
	const profileResponse = await SocialAPI.getProfile('profile', params.profileID);
	if (profileResponse.error) {
		return { status: 404, error: new Error(`Profile not found`) };
	}

	// Fetch posts by this profile from API
	const postsResponse = await SocialAPI.getPosts({userId: params.profileID});
	return {
		profile: profileResponse,
		posts: postsResponse
	};
};