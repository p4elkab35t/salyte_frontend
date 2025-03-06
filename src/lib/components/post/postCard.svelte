<script lang="ts">
    import ReactionsCard from '$lib/components/post/reactionCard.svelte';
    import CommentCard from './commentCard.svelte';
    import ProfileCard from '../profile/profileCard.micro.svelte';
    import type { profileProps } from '../profile/profileCard.micro.svelte';
    import { user } from '$lib/stores/user.svelte';

    let isAuthor = $state(false);
    let isInEditMode = $state(false);

    let newContent = $state('');

    interface changeablePostData {
        content: string;
        reaction: {
            isLiked: boolean;
            count: number;
        };
        lastComment?: {
            author: profileProps;
            content: string;
            timestamp: string;
        };
        commentsNumber: number;
    }    

    

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

    const saveContent = ()=>{
        console.log(newContent);
    }

    let postData: changeablePostData | undefined = $state();

    $inspect(postData).with(console.trace);
    

    function likePost() {
        if(!postData) return;
        postData.reaction.isLiked = !postData.reaction.isLiked;
        postData.reaction.isLiked ? postData.reaction.count++ : postData.reaction.count--;
    }

    $effect(()=>{
        author.profileID === user.profile_id ? isAuthor = true : isAuthor = false;

        postData = ({
            content: content,
            reaction: reaction,
            lastComment: lastComment,
            commentsNumber: commentsNumber
        });
    })


    const { author, timestamp, title, content, reaction, lastComment, commentsNumber, postId, children, isPage }: PostCardProps = $props();
</script>

<div class="bg-white shadow-lg rounded-none p-4 border border-gray-200 lg:w-auto w-screen my-2">
    <!-- Post Header -->
    {#if postData}
    <div class="flex flex-row justify-between items-center gap-3 mb-4">
        <a href="/post/{postId}" class="hover:underline">
        <div class="flex flex-col">
            <span class="text-sm text-gray-600 hover:underline ">{timestamp}</span>
        </div>
    </a>
        <ProfileCard name={author.name} profilePic={author.profilePic} profileID={author.profileID} bio={author.bio} />
    </div>

    <hr class="border-zinc-300 py-2" />
    <!-- Post Content -->
    <div class="mb-4">
        {#if !isInEditMode}
            <p class="text-gray-700">{postData.content}</p>
        {:else}
            <textarea class="w-full h-24 border border-gray-200 rounded-md p-2 text-zinc-800" bind:value={postData.content}></textarea>
            <button class="bg-amber-600 text-white rounded-md px-4 py-2 mt-2" onclick={() => isInEditMode = false}>Save</button>
        {/if}
    </div>
    <hr class="border-zinc-300" />

    <!-- Reaction Card -->
     <div class="flex flex-row justify-between">
        <div class="mt-2">
            <ReactionsCard isLiked={postData.reaction.isLiked} likeCount={postData.reaction.count} commentCount={postData.commentsNumber} postId={postId}/>
        </div>
        {#if isAuthor}
            <div class="pt-5 flex flex-row gap-4">
                <button class="text-gray-500 hover:underline cursor-pointer text-md" onclick={()=>isInEditMode = !isInEditMode}>Edit</button>
                <button class="text-red-500 hover:underline cursor-pointer text-md" onclick={()=>console.log('delete')}>Delete</button>
            </div>
        {/if}
     </div>
    <!-- Comment Card -->
    {#if isPage}
        {@render children?.()}
    {:else}
        <div class="mt-4">
            {#if postData.lastComment}
                <CommentCard {...postData.lastComment} />
            {/if}
        </div>
        {#if postData.commentsNumber > 1}
            <a href="/post/{postId}" class="text-gray-500 hover:underline">View all {postData.commentsNumber} comments</a>
        {/if}
    {/if}
    {:else}
        <h1>Post not found</h1>
    {/if}
</div>
