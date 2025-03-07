<script lang="ts">
    import Bubble from "$lib/components/chat/message/bubble.svelte";
    import ChatsTab from "$lib/components/chat/chatsTab.svelte";
    import type { PageProps } from "./$types";
	import { on } from "svelte/events";
	import { onMount } from "svelte";

    let { data }: PageProps = $props();
    // let chats = data.chats || [];
    $effect(() => {
        if(data.error) return;
    });

    onMount(() => {
        console.log(data);
    });


</script>

<style>

</style>


    <div class="flex flex-row h-full">
        {#if data.error}
            <h1>Error: {data.error}</h1>
        {:else}
            <!-- <div class="md:flex flex-col hidden min-h-full grow-0 w-2/6 bg-zinc-600">
                <ChatsTab chats={data.chats}/>
            </div> -->
            <div class="flex flex-col w-screen h-[92svh] md:h-[85svh] md:w-3/5 -mt-10 md:-mt-10 -mb-10 grow-1">
                <div class="w-full bg-white p-4 flex flex-row ">
                    <!-- go back button -->
                    <a href="/message" class="text-amber-500 hover:underline pt-1.5 pr-4">← Back</a>
                    <h1 class="text-2xl text-zinc-700">{data.chat.name}</h1>
                </div>
                <div class="bg-zinc-600 h-full">
                    {#each data.chats as chat}
                        <Bubble profilePic={chat.profilePic} name={chat.name} message={chat.lastMessage.content} timestamp={chat.lastMessage.timestamp} profileID={chat.profileID}/>
                    {/each}
                </div>
                <!-- input section for new messages -->
                <div class="w-full bg-white p-4 flex flex-row gap-2">
                    <input type="text" class="w-full border border-zinc-600 rounded-sm p-2 text-zinc-800" placeholder="Type a message..."/>
                    <button class="bg-amber-500 text-white p-2 rounded-sm cursor-pointer">Send</button>
                </div>
            </div>
        {/if}
    </div>