<script lang="ts">
import PostCard from "$lib/components/post/postCard.svelte";
import CommentCard, { type CommentCardProps } from "$lib/components/post/commentCard.svelte";
import mockPosts from "../../feed/mockData";
import { mockComments } from "../../feed/mockData";
import type { PostCardProps } from "$lib/components/post/postCard.svelte";
import { page } from "$app/state";

const PostID = page.params.postID;
console.log(PostID);

let newCommentContent: string = $state('');

let Post: PostCardProps | null = null;

for (let i = 0; i < mockPosts.length; i++) {
    if (mockPosts[i].postId === PostID) {
        Post = mockPosts[i];
        break;
    }    
}

const sendComment = () => {
    console.log(newCommentContent);
}

let postComments: CommentCardProps[] | undefined = $state();
$effect(() => {
    postComments = mockComments.filter(comment => comment.postId === PostID)[0]?.comments;
})

// Here I need to get ID from a slug parameter

</script>

<style>

</style>

<div>
    {#if Post}
        <PostCard {...Post} isPage={true}>
            <div class="flex flex-col gap-4 py-6">
                <textarea class="border border-gray-200 min-h-[60px] text-zinc-800 p-3" bind:value={newCommentContent}></textarea>
                <button class="bg-amber-500 text-white p-2 min-w-full md:min-w-[180px] md:w-min rounded-md" onclick={()=>{sendComment()}}>Send Comment</button>
            </div>
        </PostCard>
        {#if postComments}
            <div class="pl-6 pr-2">
                {#each postComments as comment}
                    <CommentCard author={comment.author} timestamp={comment.timestamp} content={comment.content}/>
                {/each}
            </div>
        {:else}
            <h1>No comments</h1>
        {/if}
    {:else}
        <h1>Post not found</h1>
    {/if}

</div>