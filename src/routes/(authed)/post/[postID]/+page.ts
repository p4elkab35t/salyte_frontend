import { SocialAPI } from '$lib/api/social';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    // Fetch post info from API instead of mockData
    const getPost = SocialAPI.getPost(params.postID);
    const getLikes = SocialAPI.getLikes(params.postID);
    const getComments = SocialAPI.getComments(params.postID);
    
    return {
        post: getPost,
        likes: getLikes,
        comments: getComments
    };
};