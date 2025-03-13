<script lang="ts">
    import ReactionsCard from '$lib/components/post/reactionCard.svelte';
    import CommentCard from './commentCard.svelte';
    import ProfileCard from '../profile/profileCard.micro.svelte';
    import type { profileProps } from '../profile/profileCard.micro.svelte';
    // import { user } from '$lib/stores/user.svelte';
    import { userProfileStore } from '$lib/stores/user';
    import { SocialAPI } from '$lib/api/social';
	import { onMount } from 'svelte';

    let isAuthor = $state(false);
    let isInEditMode = $state(false);

    let newContent = $state('');

    interface changeablePostData {
        content: string;
        lastComment?: {
            author: profileProps;
            content: string;
            timestamp: string;
        };
    }    

    export interface PostCardProps {
        authorId: string;
        timestamp: string;
        content: string;
        postId: string;
        isPage?: boolean;
        children?: any;
    }

    const { authorId, timestamp, content, postId, isPage, children }: PostCardProps = $props();

    const getAuthor = async (profileId: string) => {
        return SocialAPI.getProfile('profile', profileId).then((res) => {
            isAuthor = (res.ProfileID === userProfileStore.getProfile().profileId);
            return res;
        });
    }

    const getComments = async (postID: string) => {
        return SocialAPI.getComments(postID);
    }

    const getReactions = async (postID: string) => {
        return SocialAPI.getLikes(postID);
    }

    const submitEdit = async () => {
        console.log('submitting edit');
        console.log(newContent);
    }

    // export interface PostCardProps {
    //     author: profileProps;
    //     timestamp: string;
    //     title: string;
    //     content: string;
    //     reaction: {
    //         isLiked: boolean;
    //         count: number;
    //     };
    //     commentsNumber: number;
    //     lastComment?: {
    //         author: profileProps;
    //         content: string;
    //         timestamp: string;
    //     };
    //     postId: string;
    //     children?: any; 
    //     isPage?: boolean;
    // }

    // const saveContent = ()=>{
    //     console.log(newContent);
    // }

    let postData: changeablePostData | undefined = $state();

    onMount(()=>{
        postData = ({
            content: content,
            lastComment: undefined
        });
    })
    // $inspect(postData).with(console.trace);
    

    // function likePost() {
    //     if(!postData) return;
    //     postData.reaction.isLiked = !postData.reaction.isLiked;
    //     postData.reaction.isLiked ? postData.reaction.count++ : postData.reaction.count--;
    // }

    // $effect(()=>{
    //     isAuthor = author.profileID === userProfileStore.getProfile().profileId;

    //     postData = ({
    //         content: content,
    //         reaction: reaction,
    //         lastComment: lastComment,
    //         commentsNumber: commentsNumber
    //     });
    // })


</script>

<div class="bg-white shadow-lg rounded-none p-4 border border-gray-200 lg:w-auto w-screen my-2">
    <!-- Post Header -->
    <div class="flex flex-row justify-between items-center gap-3 mb-4">
        <a href="/post/{postId}" class="hover:underline">
        <div class="flex flex-col">
            <span class="text-sm text-gray-600 hover:underline ">{timestamp}</span>
        </div>
    </a>
        {#await getAuthor(authorId)}
            <h1>Loading...</h1>
        {:then author}
            {#if author}
                <ProfileCard name={author.Username} profilePic={author.ProfilePictureURL} profileID={author.ProfileID} bio={author.Bio} />
            {/if}
        {:catch error}
            <h1>Unable to load profile: {error.message}</h1>
        {/await}
    </div>

    <hr class="border-zinc-300 py-2" />
    <!-- Post Content -->
    <div class="mb-4">
        {#if postData}
            {#if !isInEditMode}
                <p class="text-gray-700">{postData.content}</p>
            {:else}
                <textarea class="w-full h-24 border border-gray-200 rounded-md p-2 text-zinc-800" bind:value={postData.content}></textarea>
                <button class="bg-amber-600 text-white rounded-md px-4 py-2 mt-2" onclick={() => isInEditMode = false}>Save</button>
            {/if}
        {:else}
            <h1>Loading...</h1>
        {/if}
    </div>
    <hr class="border-zinc-300" />

    <!-- Reaction Card -->
     <div class="flex flex-row justify-between">
        <div class="mt-2">
            <ReactionsCard postId={postId}/>
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
        {#await getComments(postId)}
            <h1>Loading...</h1>
        {:then comments}
            {#if comments}
                <div class="mt-4">
                    {#if comments.length > 0}
                        <CommentCard commentID={comments[0].CommentID} authorID={comments[0].ProfileID} content={comments[0].Content} timestamp={comments[0].CreatedAt}/>
                    {:else}
                        <h1>No comments yet</h1>
                    {/if}
                </div>
                {#if comments.length > 1}
                    <a href="/post/{postId}" class="text-gray-500 hover:underline">View all {comments.length} comments</a>
                {/if}
            {/if}
        {:catch error}
            <h1>Error: {error.message}</h1>
        {/await}
    {/if}
</div>
