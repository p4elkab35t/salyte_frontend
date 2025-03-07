<script lang="ts">
    import ProfileHead from "$lib/components/profile/profileHead.svelte";
    import { page } from "$app/state";
	import { onMount } from "svelte";
    import { profiles } from "../../feed/mockData";
    import type { PageProps } from "./$types";
    import PostCard from "$lib/components/post/postCard.svelte";

    let { data }: PageProps = $props();

    let profileID = page.params.profileID;
    console.log(profileID);
    let profile: { profileID: string; name: string;bio: string; profilePic: string } | null = null;
    $effect(() => {
        if(data.error) return;

    });
</script>

<style>

</style>

<div>
    {#if data.profile}
        <ProfileHead profileId={data.profile?.profileID} name={data.profile?.name} bio={data.profile?.bio} profilePic={data.profile?.profilePic}/>
        {#if data.posts}
            {#each data.posts as post}
                <PostCard {...post} />
            {/each}
        {:else}
            <h1>No posts</h1>
        {/if}
    {:else}
        <h1>Profile not found</h1>
    {/if}
</div>