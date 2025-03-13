<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { SocialAPI } from "$lib/api/social";
    // import { userProfileStore } from "$lib/stores/user";
    import FollowerCard from "$lib/components/follower/followerCard.svelte";

    let profileID = page.params.profileID;
    let followers = $state([]);
    let isLoading = $state(true);

    onMount(async () => {
        try {
            SocialAPI.getFollowers(profileID).then((res)=>{
                if(res === null || res === undefined || !Array.isArray(res)) {
                    followers = [];
                    return;
                }
                followers = res;
            }).finally(() => {
                isLoading = false;
            });
        } catch (error) {
            console.error(error);
        }
    });
</script>

<style>

</style>

<div class="flex flex-col gap-4">
    <h2 class="text-zinc-100 px-4 lg:px-0 text-2xl lg:text-5xl font-bold -translate-y-4 md:-translate-y-2 lg:-translate-y-4">    
        Followers
    </h2>
    <div class="flex flex-col gap-4 py-6 bg-zinc-300 px-4 w-full">
        {#if followers.length === 0 && !isLoading}
            <p class="text-zinc-100 text-lg">No followers yet</p>
        {:else if isLoading}
            <p class="text-zinc-100 text-lg">Loading...</p>
        {:else}
            {#each followers as follower}
                <FollowerCard name={follower.Username} profilePic={follower.ProfilePictureURL} profileID={follower.ProfileID} bio={follower.Bio} />
            {/each}
        {/if}
    </div>
</div>