import type { PageLoad } from './$types';
import { MessageAPI } from '$lib/api/message';

export const load: PageLoad = async ({ params }) => {
	// Fetch the chat using API instead of mockData
	const chatResponse = await MessageAPI.getChat(params.chatID);
	if (chatResponse.error) {
		return { status: 404, error: new Error(`Chat not found`) };
	}

	// Optionally, fetch a list of chats for sidebar view
	const chatsResponse = await MessageAPI.getAllChats();
	return {
		chat: chatResponse,
		chats: chatsResponse
	};
};