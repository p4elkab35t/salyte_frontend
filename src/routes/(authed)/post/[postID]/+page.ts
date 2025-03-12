import { SocialAPI } from '$lib/api/social';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    // Fetch post info from API instead of mockData
    const postMain = await SocialAPI.getPost(params.postID).then((res) => res).catch((err) => err);
    if (postMain.error) {
        return { status: 404, error: new Error(`Post could not be fetched`) };
    }

    const postLikes = await SocialAPI.getLikes(params.postID).then((res) => res).catch((err) => err);
    if (postLikes.error) {
        return { status: 404, error: new Error(`Likes could not be fetched`) };
    }

    // Fetch posts by this profile from API
    const postComments = await SocialAPI.getComments(params.postID).then((res) => res).catch((err) => err);
    if (postComments.error) {
        return { status: 404, error: new Error(`Comments could not be fetched`) };
    }
    return {
        post: postMain,
        likes: postLikes,
        comments: postComments
    };
};