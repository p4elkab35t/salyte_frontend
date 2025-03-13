<script lang="ts">
	import ProfileCard from '../profile/profileCard.micro.svelte';
	import type { profileProps } from '../profile/profileCard.micro.svelte';
	import NavItem from './navItem.svelte';
    import FeedIcon from '$lib/icons/feedIcon.svelte';
    import ChatIcon from '$lib/icons/chatIcon.svelte';
    // import CommunityIcon from '$lib/icons/communityIcon.svelte';
    import { userProfileStore } from '$lib/stores/user';
	import { onMount } from 'svelte';
	
	// interface NavProps {
	// 	profile: profileProps;
	// }
	// let { profile }: NavProps = $props();
	const links = [
        {
			name: 'Feed',
			href: '/feed',
            svg: FeedIcon
		},
        {
			name: 'Chat',
			href: '/message',
            svg: ChatIcon
		},
		// {
		// 	name: 'Communities',
		// 	href: '/community',
        //     svg: CommunityIcon
		// }
	];

	interface userProfile {
		profileId: string | null;
		displayName: string | null;
		avatar: string | null;
		bio: string | null;
	}
	let user = $state<userProfile>();
	onMount(() => {
		// console.log(profile);
		user = userProfileStore.getProfile();
	// console.log(user);
	});
</script>

<nav class="bg-zinc-400 max-h-20">
	<div class="flex flex-row justify-between px-10">
		<ul class="flex lg:gap-[2rem] grow sm:grow-0 gap-[0rem] justify-evenly">
			{#each links as link (link.name)}
				<NavItem href={link.href} name={link.name} Svg={link.svg}/>
			{/each}
		</ul>
		{#if user && user.profileId}
		<div class="text-[#212121] p-0 py-2 pt-3">
			<ProfileCard
				profileID={user.profileId}
				name={user.displayName}
				profilePic={user.avatar}
				bio={user.bio}
			/>
		</div>
		{:else}
		<div class="text-[#212121] p-0 py-2 pt-3">
			loading...	
		</div>
		{/if}
	</div>
</nav>

<style>
</style>
