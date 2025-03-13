<script lang="ts">
	import { userProfileStore } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import InteractionButton from '../general/interactionButton.svelte';
	import { onMount } from 'svelte';
	import { SocialAPI } from '$lib/api/social';

	let user = userProfileStore.getProfile();

	let isFollowing = $state(false);
	interface profileProps {
		name?: string | null;
		profilePic?: string | null;
		profileID?: string | null;
		bio?: string | null;
	}

	
	let isMe = $state(false);

	let { name, profilePic, profileID, bio }: profileProps = $props();

	
	const followLink = (link: string) => {
		goto(link);
	};

	const followUser = async () => {
        isFollowing = true;
		if(!profileID)
		{
			console.error('Profile ID is not defined');
			return;
		}
        SocialAPI.followUser(profileID).then((res) => {
            if(!userProfileStore.getProfile().followingIDs )
            {
                userProfileStore.setProfile({
                    followingIDs: [profileID]
                });
            }
            userProfileStore.setProfile({
                followingIDs: [...userProfileStore.getProfile().followingIDs, profileID]
            });
            if(res != null && res != undefined && res.error)
            {
                throw new Error(res.error);
            }
        }).catch((error) => {
            isFollowing = false;
            console.error(error);
        });
    }

    const unfollowUser = async () => {
        isFollowing = false;
		if(!profileID)
		{
			console.error('Profile ID is not defined');
			return;
		}
        SocialAPI.unfollowUser(profileID).then((res) => {
            if(!userProfileStore.getProfile().followingIDs)
            {
                userProfileStore.setProfile({
                    followingIDs: []
                });
            }
            userProfileStore.setProfile({
                followingIDs: userProfileStore.getProfile().followingIDs.filter((id) => id !== profileID)
            });
            if(res != null && res != undefined && res.error)
            {
                throw new Error(res.error);
            }
        }).catch((error) => {
            isFollowing = true;
            console.error(error);
        });
    }

	onMount(() => {
		userProfileStore.subscribe((userProfile) => {
			isMe = userProfile.profileId === profileID;
            isFollowing = userProfile.followingIDs?.includes(profileID) ?? false;
		});
	});
</script>

<div class="card w-[90svw] lg:w-auto lg:min-w-3xs border border-zinc-600 text-zinc-600 p-4 rounded-sm z-100 lg:absolute bg-zinc-50">
	<div class="flex items-center">
		<a href="/profile/{profileID}" class="flex items-center w-full">
			<img src={profilePic} alt="{name}'s profile picture" class="rounded-sm h-18 w-18 object-cover" />
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
				{#if isFollowing}
					<InteractionButton buttonText="Unfollow" submitFunction={unfollowUser} />
				{:else}
                    <InteractionButton buttonText="Follow" submitFunction={followUser} />
				{/if}
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
