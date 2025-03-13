<script lang="ts">
    import ProfileHead from "$lib/components/profile/profileHead.svelte";
    // import { page } from "$app/state";
	// import { onMount } from "svelte";
    import type { PostCardProps } from "$lib/components/post/postCard.svelte";
	import type { PageProps } from './$types';
    import PostCard from "$lib/components/post/postCard.svelte";

    let { data }: PageProps = $props();


    export interface PostCardProps {
        author: profileProps;
        timestamp: string;
        title: string;
        content: string;
        reaction: {
            isLiked: boolean;
            count: number;
        };
        commentsNumber: number;
        lastComment?: {
            author: profileProps;
            content: string;
            timestamp: string;
        };
        postId: string;
        children?: any; 
        isPage?: boolean;
    }
    // $effect(() => {
    //     if(data.error) return;
    // });
</script>

<style>

</style>

<div>
    {#await data.profile}
        <h1>Loading...</h1>
    {:then profile} 
        {#if profile}
            <ProfileHead profileId={profile.ProfileID} name={profile.Username} bio={profile.Bio} profilePic={profile.ProfilePictureURL}/>
            {#await data.posts}
                <h1>Loading...</h1>
            {:then posts}
                {#if posts}
                    {#if posts.length === 0 && posts !== undefined}
                        <h1>No posts</h1>
                    {/if}
                    {#each posts as post (post.PostID)}
                        <PostCard authorId={post.ProfileID} postId={post.PostID} timestamp={post.CreatedAt} content={post.Content} />
                    {/each}
                {:else}
                    <h1>No posts</h1>
                {/if}
            {:catch error}
                <h1>Error: {error.message}</h1>
            {/await}
        {:else}
            <h1>Profile not found</h1>
        {/if}
    {:catch error}
        <h1>Error: {error.message}</h1>
    {/await}
</div>