<script lang="ts">
    import PostCard from "$lib/components/post/postCard.svelte";
    import type { PageProps } from "./$types";
    let { data }: PageProps = $props();
</script>

<main>
    <h2 class="text-zinc-100 px-4 lg:px-0 text-2xl lg:text-5xl font-bold -translate-y-4 md:-translate-y-2 lg:-translate-y-4">    
        My Infinite Feed
    </h2>
    <!-- New post entry form -->
    <div class="flex flex-col gap-4 py-6 bg-zinc-100 px-4">
        <textarea class="border border-zinc-600 min-h-[60px] text-zinc-800 p-3 rounded-sm" placeholder="What's new?"></textarea>
        <button class="bg-amber-500 text-white p-2 min-w-full md:min-w-[180px] md:w-min rounded-md cursor-pointer hover:bg-amber-600">Post</button>
    </div>
    {#each data.posts as post}
        <PostCard {...post} />
    {/each}
</main>

<style>
</style>
