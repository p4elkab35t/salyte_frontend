<script lang="ts">
    import HeartEmptyIcon from "$lib/icons/heartEmptyIcon.svelte";
    import CommentIcon from "$lib/icons/commentIcon.svelte";
    import { SocialAPI } from "$lib/api/social";
	import { userProfileStore } from "$lib/stores/user";

    interface ReactionCardProps {
        postId: string;
    }

    let isLiked = $state(false);
    let likeCount = $state(0);
    let commentCount = $state(0);

    let { postId }: ReactionCardProps = $props();

    const getComments = async (postID: string) => {
        return SocialAPI.getComments(postID).then((res) => {
            commentCount = res.length;
            return res;
        });
    }

    const getReactions = async (postID: string) => {
        return SocialAPI.getLikes(postID).then((res) => {
            res.map((reaction) => {
                if (reaction.ProfileID === userProfileStore.getProfile().profileId) {
                    isLiked = true;
                }
            });
            likeCount = res.length;
            return res;
        });
    }

    function likePost() {
        if (isLiked) {
            isLiked = false;
            likeCount--;
            SocialAPI.unlikePost(postId).catch((error) => {
                isLiked = true;
                likeCount++;
                console.error(error);
            });
        } else {
            isLiked = true;
            likeCount++;
            SocialAPI.likePost(postId).catch((error) => {
                isLiked = false;
                likeCount--;
                console.error(error);
            });
        }
    }
    
</script>

<style>
    :global(.likedPost>svg) {
        width: 2rem;
        height: 2rem;
        fill: #212121;
        animation: likedPost 0.25s ease forwards;
    }
    :global(.notLikedPost>svg) {
        width: 2rem;
        height: 2rem;
        fill: none;
        animation: notLikedPost 0.25s ease forwards;
    }

    @keyframes notLikedPost {
        0% {
            fill: #212121;
            scale: 1;
        }
        20% {
            fill: none;
            scale: 0.8;
        }
        100% {
            fill: none;
            scale: 1;   
        }
    }

    @keyframes likedPost {
        0% {
            fill: none;
            scale: 1;
        }
        20% {
            fill: #212121;
            scale: 1.2;
        }
        100% {
            fill: #212121;
            scale: 1;   
        }
    }
</style>

<div class="flex items-center gap-3 w-full pt-2">
    {#await getReactions(postId)}
        <div>Loading...</div>
    {:then reactions}
        <button type="button" class="flex items-center space-x-2 text-zinc-800 cursor-pointer" onclick={likePost} onkeydown={(e) => e.key === 'Enter' && likePost()} aria-pressed={isLiked}>
            <div class="w-6 h-6 {isLiked?'likedPost':'notLikedPost'}">
                <HeartEmptyIcon />
            </div>
            <span class="text-md font-semibold px-1 pt-[7px]">{likeCount}</span>
        </button>
    {:catch error}
        <div>Error: {error.message}</div>
    {/await}
    {#await getComments(postId)}
        <div>Loading...</div>
    {:then comments}
        <button type="button" class="flex items-center space-x-2 text-zinc-800 cursor-pointer">
            <a href="/post/{postId}" class="flex items-center space-x-2">
            <div class="w-4 h-4 mb-2">
                <CommentIcon />
            </div>
            <span class="text-md font-semibold pl-2 pt-[7px]">{commentCount}</span>
            </a>    
        </button>
    {:catch error}
        <div>Error: {error.message}</div>
    {/await}
</div>