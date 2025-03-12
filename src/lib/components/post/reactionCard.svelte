<script lang="ts">
    import HeartEmptyIcon from "$lib/icons/heartEmptyIcon.svelte";
    import CommentIcon from "$lib/icons/commentIcon.svelte";

    interface ReactionCardProps {
        likeCount: number;
        commentCount: number;
        isLiked: boolean;
        postId: string;
    }

    let { likeCount=$bindable(), commentCount, postId, isLiked }: ReactionCardProps = $props();

    function likePost() {
        isLiked = !isLiked;
        // isLiked ? likeCount++ : likeCount--;
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
    <button type="button" class="flex items-center space-x-2 text-zinc-800 cursor-pointer" onclick={likePost} onkeydown={(e) => e.key === 'Enter' && likePost()} aria-pressed={isLiked}>
        <div class="w-6 h-6 {isLiked?'likedPost':'notLikedPost'}">
            <HeartEmptyIcon />
        </div>
        <span class="text-md font-semibold px-1 pt-[7px]">{likeCount}</span>
    </button>
    <button type="button" class="flex items-center space-x-2 text-zinc-800 cursor-pointer">
        <a href="/post/{postId}" class="flex items-center space-x-2">
        <div class="w-4 h-4 mb-2">
            <CommentIcon />
        </div>
        <span class="text-md font-semibold pl-2 pt-[7px]">{commentCount}</span>
        </a>    
    </button>
</div>