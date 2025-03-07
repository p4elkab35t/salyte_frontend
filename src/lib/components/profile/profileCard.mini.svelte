<script lang="ts">
	import { user } from '$lib/stores/user.svelte';
	import { goto } from '$app/navigation';
	import InteractionButton from '../general/interactionButton.svelte';

	interface profileProps {
		name: string;
		profilePic: string;
		profileID: string;
		bio?: string;
	}

	let isMe = $state(false);

	let { name, profilePic, profileID, bio }: profileProps = $props();

	if (profileID == user.profile_id) {
		isMe = true;
	}

	const followLink = (link: string) => {
		goto(link);
	};

	const submitToHook = () => {
		console.log('Submitted to hook');
	};
</script>

<div class="card w-[90svw] lg:w-auto lg:min-w-3xs border border-zinc-600 text-zinc-600 p-4 rounded-sm z-100 lg:absolute bg-zinc-50">
	<div class="flex items-center">
		<a href="/profile/{profileID}" class="flex items-center w-full">
			<img src={profilePic} alt="{name}'s profile picture" class="rounded-sm h-18 w-18" />
			<div class="ml-4 text-center w-full">
				<h1 class="text-lg font-bold">{name}</h1>
				<p class="text-sm text-gray-500">{bio}</p>
			</div>
		</a>
	</div>
	<div class="mt-4 flex flex-row lg:flex-col justify-center gap-4">
        <InteractionButton buttonText="Go to Profile" submitFunction={() => followLink(`/profile/${profileID}`)} />
            <div class="flex flex-row justify-center gap-4"> 
	            {#if isMe}
                    <!-- <InteractionButton
                        buttonText="Settings"
                        submitFunction={() => followLink(`/profile/${profileID}/settings`)}
                    /> -->
                    <!-- <a href="/profile/{profileID}/settings" class="bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 rounded">Settings</a> -->
                {:else}
                    <InteractionButton buttonText="Follow" submitFunction={() => submitToHook()} />
                    <InteractionButton
                        buttonText="Message"
                        submitFunction={() => followLink(`/message/${profileID}`)}
                    />
                    <!-- <button class="bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 rounded">Follow</button>
                    <a href="/message/{profileID}" class="bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 rounded">Message</a> -->
                {/if}
            </div>
	</div>
</div>

<style>
</style>
