<script lang="ts">
    import ProfileCard from "../profile/profileCard.micro.svelte";
    import { userProfileStore } from "$lib/stores/user";
	import { onMount } from "svelte";
    import { SocialAPI } from "$lib/api/social";
	import { goto } from "$app/navigation";

    let isFollowing = $state(false);
    let isOwner = $state(false);
    let isLoading = $state(true);

    let { name, profilePic, profileID, bio } = $props();

    const followUser = async () => {
        try {
            isFollowing = true;
            SocialAPI.followUser(profileID).then((res) => {
                if(res.error) {
                    throw new Error(res.error);
                }
            }).catch((error) => {
                isFollowing = false;
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const unfollowUser = async () => {
        try {
            isFollowing = false;
            SocialAPI.unfollowUser(profileID).then((res) => {
                if(res.error) {
                    throw new Error(res.error);
                }
            }).catch((error) => {
                isFollowing = true;
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    }

    onMount(() => {
        let user = userProfileStore.subscribe((user)=>{
            if(user.followingIDs === null || user.followingIDs === undefined) {
                isFollowing = false;
            }
            else{  
                isFollowing = user.followingIDs.includes(profileID);
            }
            isOwner = user.profileId === profileID;
        });
    });
</script>

<style>

</style>

<div class="w-full flex flex-row justify-between bg-zinc-100 p-4">
    <div class="flex items-start justify-start gap-3">
        <ProfileCard {name} {profilePic} {profileID} {bio} />
    </div>
    <div class="flex flex-row items-end justify-end gap-4 min-w-1">
        {#if !isOwner}
            {#if isFollowing}
                <button class="bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 rounded" onclick={unfollowUser}>Unfollow</button>
            {:else}
                <button class="bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 rounded" onclick={followUser}>Follow</button>
            {/if}
            <button class="bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 rounded" onclick={()=>{goto(`/message/${profileID}`)}}>Message</button>
        {:else}
            <h2 class="text-zinc-700 text-center p-2 font-semibold pb-4 text-xl">You</h2>
        {/if}
    </div>
</div>