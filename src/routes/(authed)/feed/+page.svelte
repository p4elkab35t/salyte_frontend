<script lang="ts">
    import PostCard from "$lib/components/post/postCard.svelte";
    import type { PostCardProps } from "$lib/components/post/postCard.svelte";
    import mockPosts from "./mockData";

    // author: {
    //     name: string;
    //     bio: string;
    //     profilePic: string;
    //     profileID: string;
    // };
    // timestamp: string;
    // title: string;
    // content: string;
    // reaction: {
        //     isLiked: Math.random() < 0.5,
        //     count: Math.floor(Math.random() * 100)
        // }number;
    // commentsNumber: number;
    // postId: string;
</script>

<main>
    <h2 class="text-zinc-100 px-4 lg:px-0 text-2xl lg:text-5xl font-bold -translate-y-4 md:-translate-y-2 lg:-translate-y-4">    
        My Infinite Feed
    </h2>
    {#each mockPosts as post}
        <PostCard {...post} />
    {/each}
</main>

<style>
</style>
