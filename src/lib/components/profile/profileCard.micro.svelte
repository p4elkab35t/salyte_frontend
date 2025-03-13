<script lang="ts">
	import ProfileCard from './profileCard.mini.svelte';

	export interface profileProps {
		name: string | null;
		bio?: string | null;
		profilePic: string | null;
		communities?: string[];
		friends?: string[];
		posts?: string[];
		profileID: string | null;
	}

	let { name, profilePic, profileID, bio }: profileProps = $props();

	let isClicked = $state(false);
</script>

<div class="relative cursor-pointer sm:p-0 px-3">
	<button
		type="button"
		class="flex flex-row gap-4 items-center text-[#212121] group cursor-pointer"
		onclick={() => (isClicked = !isClicked)}
		onkeydown={(e) => e.key === 'Enter' && (isClicked = !isClicked)}
		aria-label="Profile card"
	>
        <h1 class="text-md font-semibold max-w-20 min-w-20" style="text-overflow:fade;">{name}</h1>
		<img
			src={profilePic}
			alt="{name}'s profile picture"
			class="rounded-md w-13 h-13 object-cover border-2 border-[#212121] group-hover:border-1 group-hover:scale-105 transition-all"
		/>
	</button>
	{#if isClicked}
		<button class="block z-40 fixed lg:hidden top-0 left-0 w-screen h-screen bg-black opacity-75" onclick={() => (isClicked = !isClicked)} aria-label="Close profile card"></button>
		<div class="lg:z-30 z-50 top-1/2 left-1/2 -translate-1/2 fixed lg:absolute lg:top-14 lg:right-0 bg-zinc-100 rounded-lg cursor-pointer">
			<ProfileCard {name} {profilePic} {profileID} {bio} />
		</div>
	{/if}
</div>

<style>
</style>
