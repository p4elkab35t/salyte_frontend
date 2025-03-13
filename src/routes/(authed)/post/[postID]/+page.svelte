<script lang="ts">
    import PostCard from "$lib/components/post/postCard.svelte";
    import CommentCard, { type CommentCardProps } from "$lib/components/post/commentCard.svelte";
	import ProfileHead from "$lib/components/profile/profileHead.svelte";
    import { page } from "$app/state";
	import { onMount } from "svelte";
    import { SocialAPI } from "$lib/api/social";
	import type { PageProps, PageData } from './$types';
    import { userProfileStore } from "$lib/stores/user";

    let { data }: PageProps = $props();
    
    let newCommentContent: string = $state('');

    interface newComment {
        ProfileID: string;
        PostID: string;
        Content: string;
    }

    // $effect(() => {
    //     if(data.error) return;
    // });
    let isSendng = $state(false)
    
    const syncComments = async (PostID: string, nocache?:boolean) => {
        return SocialAPI.getComments(PostID, nocache).then((res) => {
            commentSection = res;
        });
    }

    interface commentSectionUnit {
        ProfileID: string;
        PostID: string;
        Content: string;
        CreatedAt: string;
    }

    let commentSection = $state<commentSectionUnit[]>([]);


    const sendComment = async (postID: string) => {
        if(newCommentContent === '') return;
        try {
            isSendng = true;
            const userProfileID = userProfileStore.getProfile().profileId;
            if(!userProfileID){
                throw new Error('Failed to verify user profile, try again');
            }
            const newComment: newComment = {
                ProfileID: userProfileID,
                PostID: postID,
                Content: newCommentContent
            }
            await SocialAPI.addComment(newComment).then((res) => {
                console.log(res);
                if(res.error) {
                    throw new Error(res.error);
                }
                syncComments(postID, true);
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
                <button class="bg-amber-500 text-white p-2 min-w-full md:min-w-[180px] md:w-min rounded-md" onclick={()=>{sendComment(currentPost.PostID)}}>Send Comment</button>
            </div>
        </PostCard>
        {#await syncComments(currentPost.PostID)}
            <h1>Loading comments...</h1>
        {:then commentsSynced}
            {#if commentSection && commentSection.length > 0}
                <div class="pl-6 pr-2">
                    {#each commentSection as comment}
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