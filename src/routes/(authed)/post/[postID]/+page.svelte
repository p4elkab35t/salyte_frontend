<script lang="ts">
    import PostCard from "$lib/components/post/postCard.svelte";
    import CommentCard, { type CommentCardProps } from "$lib/components/post/commentCard.svelte";
	import ProfileHead from "$lib/components/profile/profileHead.svelte";
    import { page } from "$app/state";
	import { onMount } from "svelte";
	import type { PageProps, PageData } from './$types';

    let { data }: PageProps = $props();
    
    let newCommentContent: string = $state('');

    // $effect(() => {
    //     if(data.error) return;
    // });

</script>

<style>

</style>

<div>
    {#await data.post}
        <h1>Loading...</h1>
    {:then post} 
        <PostCard {...post} isPage={true}>
            <div class="flex flex-col gap-4 py-6">
                <textarea class="border border-gray-200 min-h-[60px] text-zinc-800 p-3" bind:value={newCommentContent}></textarea>
                <button class="bg-amber-500 text-white p-2 min-w-full md:min-w-[180px] md:w-min rounded-md" onclick={()=>{sendComment()}}>Send Comment</button>
            </div>
        </PostCard>
        {#await data.comments}
            <h1>Loading comments...</h1>
        {:then postComments}
            {#if postComments}
                <div class="pl-6 pr-2">
                    {#each postComments as comment}
                        <CommentCard author={comment.author} timestamp={comment.timestamp} content={comment.content}/>
                    {/each}
                </div>
            {:else}
                <h1>No comments</h1>
            {/if}
        {:catch error}
            <h1>Error: {error.message}</h1>
        {/await}
    {:catch error}
        <h1>Error: {error.message}</h1>
    {/await}

</div>