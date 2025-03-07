<script lang="ts">
    import { user } from "$lib/stores/user.svelte";
	import { onMount } from "svelte";

    interface profileHeadProps {
        profileId: string;
        name: string;
        bio: string;
        profilePic: string;
    }

    let name = $state('');
    let bio = $state('');
    let profilePic = $state('');

    let editing = $state(false);
    let isOwner = $state(false);

    const profileProps: profileHeadProps = $props();

    onMount(() => {
        name = profileProps.name;
        bio = profileProps.bio;
        profilePic = profileProps.profilePic;
        if(user.profile_id === profileProps.profileId) isOwner = true;
    });

    const saveChanges = () => {
        console.log('Saving changes');
        editing = !editing;
    }

</script>

<style>

</style>

<div class="profile-card w-full flex flex-row gap-10 border border-zinc-600 text-zinc-800 p-4 rounded-sm bg-zinc-300">
    <img class="profile-pic w-32 h-32 border rounded-sm" src={profilePic || 'default.jpg'} alt="{name}'s profile picture" />
    <div class="flex flex-col justify-between gap-4">
    {#if editing}
        <div class="flex flex-col">
            <h2 class="text-lg font-bold">Edit Profile</h2>
            <hr class="border-zinc-600" />
            <label for="name">
                Name:
                <input class="bg-white border p-0.5 w-full" type="text" bind:value={user.name} placeholder="Your name" />
            </label>
            
            <label for="bio">
                Bio:
                <input class="bg-white border p-0.5 w-full" type="text" bind:value={user.bio} placeholder="Bio" />
            </label>
            
            <label for="profilePic">
                Profile Picture URL:
                <input class="bg-white border p-0.5 w-full" type="url" bind:value={user.profile_picture} placeholder="Profile Picture URL" />
            </label>
            
        </div>
        <div>
          <button class="py-2 px-4 bg-emerald-700 text-zinc-100 hover:bg-emerald-800 cursor-pointer" onclick={saveChanges}>Save</button>
          <button class="py-2 px-4 bg-red-700 text-zinc-100 hover:bg-red-800 cursor-pointer" onclick={() => editing = !editing}>Cancel</button>
        </div>
    {:else}
        <div class="flex flex-col">
            <h2 class="text-3xl font-bold">{name}</h2>
            <p class="text-md text-zinc-600">{bio}</p>
        </div>
        {#if isOwner}
            <div>
                <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={() => editing = !editing}>Edit Profile</button>
                <!-- <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={() => console.log('Go to Settings')}>Settings</button> -->
            </div>
        {:else}
            <div>
                <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={() => console.log('Follow')}>Follow</button>
                <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={() => console.log('Message')}>Message</button>
                <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={() => console.log('See Following')}>Following</button>
                <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={() => console.log('See Followers')}>Followers</button>
            </div>
        {/if}
    {/if}
    </div>
  </div>