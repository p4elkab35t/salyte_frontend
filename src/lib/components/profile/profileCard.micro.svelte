<script lang="ts">
	import ProfileCard from './profileCard.mini.svelte';

	export interface profileProps {
		name: string;
		bio?: string;
		profilePic: string;
		communities?: string[];
		friends?: string[];
		posts?: string[];
		profileID: string;
	}

	let { name, profilePic, profileID, bio }: profileProps = $props();

	let isClicked = $state(false);
</script>

<div class="relative cursor-pointer sm:p-0 px-3">
	<button
		type="button"
		class="flex flex-col items-center text-[#212121] group cursor-pointer"
		onclick={() => (isClicked = !isClicked)}
		onkeydown={(e) => e.key === 'Enter' && (isClicked = !isClicked)}
		aria-label="Profile card"
	>
		<img
			src={profilePic}
			alt="{name}'s profile picture"
			class="rounded-md w-12 h-12 border-2 border-[#212121] group-hover:border-1 group-hover:scale-105 transition-all"
		/>
		<h1 class="text-[12px]">{name}</h1>
	</button>
	{#if isClicked}
		<div class="absolute top-14 right-0 bg-zinc-100 rounded-lg cursor-pointer">
			<ProfileCard {name} {profilePic} {profileID} {bio} />
		</div>
	{/if}
</div>

<style>
</style>
