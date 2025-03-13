<script lang="ts">
    import PostCard from "$lib/components/post/postCard.svelte";
    import CommentCard, { type CommentCardProps } from "$lib/components/post/commentCard.svelte";
	import ProfileHead from "$lib/components/profile/profileHead.svelte";
    import { page } from "$app/state";
	import { onMount } from "svelte";
    import { SocialAPI } from "$lib/api/social";
	import type { PageProps, PageData } from './$types';

    let { data }: PageProps = $props();
    
    let newCommentContent: string = $state('');

    // $effect(() => {
    //     if(data.error) return;
    // });
    let isSendng = $state(false)

    const sendComment = async () => {
        if(newCommentContent === '') return;
        try {
            isSendng = true;
            await SocialAPI.addComment(data.post.PostID, newCommentContent).then((res) => {
                console.log(res);
                
            }).finally(() => {
                isSendng = false;
                newCommentContent = '';
            });
        } catch (error) {
            isSendng = false;
            console.error('Failed to send comment:', error);
        }
    }

</script>

<style>

</style>

<div>
    {#await data.post}
        <h1>Loading...</h1>
    {:then currentPost} 
        <PostCard authorId={currentPost.ProfileID} timestamp={currentPost.CreatedAt} content={currentPost.Content} postId={currentPost.PostID}  isPage={true}>
            <div class="flex flex-col gap-4 py-6">
                <textarea class="border border-gray-200 min-h-[60px] text-zinc-800 p-3" bind:value={newCommentContent} disabled={isSendng}></textarea>
                <button class="bg-amber-500 text-white p-2 min-w-full md:min-w-[180px] md:w-min rounded-md" onclick={()=>{sendComment()}}>Send Comment</button>
            </div>
        </PostCard>
        {#await data.comments}
            <h1>Loading comments...</h1>
        {:then postComments}
            {#if postComments}
                <div class="pl-6 pr-2">
                    {#each postComments as comment}
                        <CommentCard authorID={comment.ProfileID} timestamp={comment.CreatedAt} content={comment.Content}/>
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