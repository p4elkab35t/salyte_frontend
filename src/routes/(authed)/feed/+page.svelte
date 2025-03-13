<script lang="ts">
    import PostCard from "$lib/components/post/postCard.svelte";
    import type { PageProps } from "./$types";
    import { SocialAPI } from "$lib/api/social";
    import { onMount } from "svelte";
	import { page } from "$app/state";

    let { data }: PageProps = $props();

    let postSection = $state<postProps[]>([]);

    let newPostData = $state('');

    let currentPage = $state(1);

    let sentinel: HTMLElement | null = $state(null);
    
    let reachedTheEnd = $state(false);
    
    interface postProps {
        ProfileID?: string;
        PostID?: string;
        CreatedAt?: string;
        Content: string;
        Visibility?: string;
    }

    const syncPosts = async (pageToFetch: number) => {
        return SocialAPI.getPosts({page: pageToFetch, limit: 5}).then((res) => {
            if(res.length === 0) {
                return [];
            }
            postSection.push(...res);
            return res;
        });
    }


    const createPost = async (content: string, postId?: string, profileId?: string) => {
        if(content === '') return;
        try {
            const newPost: postProps = {
                ProfileID: profileId,
                PostID: postId,
                Content: content,
                Visibility: 'public'
            }
            await SocialAPI.createPost(newPost).then((res) => {
                console.log(res);
                if(res.error) {
                    throw new Error(res.error);
                }
                currentPage = 1;
                postSection = [];
                syncPosts(currentPage);
            });
        } catch (error) {
            console.error(error);
        }
    }

    let observer: IntersectionObserver;

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                console.log('entries', entries);
                entries.forEach((entry) => {
                    console.log('entry', entry);
                    reachedTheEnd = entry.isIntersecting;
                    if (entry.isIntersecting) {
                        console.log('reached the end');
                        reachedTheEnd = true;
                        currentPage++;
                        syncPosts(currentPage);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );
        console.log('sentinel', sentinel);

        if (sentinel) {
            console.log('observing');
            observer.observe(sentinel);
        }

        return () => {
            if (sentinel) {
                console.log('unobserving');
                observer.unobserve(sentinel);
            }
        };
    });

    $effect(()=>{
        if(sentinel && observer){
            console.log('observing');
            observer.observe(sentinel);
        }
    })
</script>

<main>
    <h2 class="text-zinc-100 px-4 lg:px-0 text-2xl lg:text-5xl font-bold -translate-y-4 md:-translate-y-2 lg:-translate-y-4">    
        My Infinite Feed
    </h2>
    <!-- New post entry form -->
    <div class="flex flex-col gap-4 py-6 bg-zinc-100 px-4">
        <textarea class="border border-zinc-600 min-h-[60px] text-zinc-800 p-3 rounded-sm" placeholder="What's new?" bind:value={newPostData}></textarea>
        <button class="bg-amber-500 text-white p-2 min-w-full md:min-w-[180px] md:w-min rounded-md cursor-pointer hover:bg-amber-600" onclick={()=>{createPost(newPostData)}}>Post</button>
    </div>

    {#await syncPosts(1)}
        <h1>Loading...</h1>
    {:then posts}
        {#each postSection as post (post.PostID)}
            <PostCard authorId={post.ProfileID} postId={post.PostID} timestamp={post.CreatedAt} content={post.Content} />
        {/each}
        {#if postSection.length === 0}
            <h1 class="text-zinc-100 text-2xl text-center">No posts to show</h1>
        {:else}
            <div class="w-full h-1 border-2" bind:this={sentinel}></div>
        {/if}
    {:catch error}
        <h1>Error: {error.message}</h1>
    {/await}
</main>

<style>
</style>
