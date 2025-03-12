<script lang="ts">
    import { userProfileStore } from "$lib/stores/user";
	import { onMount } from "svelte";

    interface BubbleProps {
        profilePic: string;
        name: string;
        message: string;
        timestamp: string;
        isRead?: boolean;
        profileID: string;
    }
    let isLeft = $state(false);

    let { profilePic, message, name, timestamp, profileID, isRead }: BubbleProps = $props();

    onMount(() => {
        if (userProfileStore.getProfile().profileId === profileID) {
            isLeft = true;
        }
    });
</script>

<style>
    .message-container {
        max-width: 90%;
        word-wrap: break-word;
    }
</style>

<div class="flex items-end space-x-2 max-w-xs mx-2 my-1 p-3 bg-zinc-100 text-zinc-800 rounded-lg shadow-md relative {isLeft ? 'flex-row-reverse ml-auto mr-2' : ''}">
    <img src={profilePic} alt="{name}'s profile picture" class="w-10 h-10 relative mb-auto mt-0 rounded-full" />
    <div class="flex flex-col  flex-grow max-w-[80%] ">
        <p class="text-md pt-3 pb-3 message-container {!isLeft?'':''}">{message}</p>
        <p class="text-sm absolute top-1 font-semibold {!isLeft?'left-15':'left-4'}">{name}</p>
    </div>
    {#if isRead}
    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
    {/if}
    <p class="text-xs text-gray-500 absolute bottom-1 whitespace-nowrap {isLeft?'left-2':'right-2'}">{timestamp}</p>
</div>