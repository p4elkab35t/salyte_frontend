import type { PageLoad } from './$types';
import { MessageAPI } from '$lib/api/message';
import { userProfileStore } from '$lib/stores/user';

export const load: PageLoad = async ({ params }) => {
	// get the chat ID from the url
	const chatID = params.chatID;
	// fetch the chat messages
	const messages = await MessageAPI.getMessagesByChatID(chatID, 20, 1);
	// fetch the user profile
	const user = userProfileStore.getProfile();
	// return the messages and user profile
	return { props: { messages, user } };
};