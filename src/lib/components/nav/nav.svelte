<script lang="ts">
	import ProfileCard from '../profile/profileCard.micro.svelte';
	import type { profileProps } from '../profile/profileCard.micro.svelte';
	import NavItem from './navItem.svelte';
    import FeedIcon from '$lib/icons/feedIcon.svelte';
    import ChatIcon from '$lib/icons/chatIcon.svelte';
    import CommunityIcon from '$lib/icons/communityIcon.svelte';
    import { user } from '$lib/stores/user.svelte';

	interface NavProps {
		profile: profileProps;
	}
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
</script>

<nav class="bg-zinc-400 max-h-20">
	<div class="flex flex-row justify-between px-10">
		<ul class="flex lg:gap-[2rem] grow sm:grow-0 gap-[0rem] justify-evenly">
			{#each links as link}
				<NavItem href={link.href} name={link.name} Svg={link.svg}/>
			{/each}
		</ul>
		<div class="text-[#212121] p-0 py-2 pt-3">
			<ProfileCard
				profileID={user.profile_id}
				name={user.name}
				profilePic={user.profile_picture}
				bio={user.bio}
			/>
		</div>
	</div>
</nav>

<style>
</style>
