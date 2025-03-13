<script lang="ts">
    import Bubble from "$lib/components/chat/message/bubble.svelte";
    import ChatsTab from "$lib/components/chat/chatsTab.svelte";
    import type { PageProps } from "./$types";
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
        {#if data}
            <!-- <div class="md:flex flex-col hidden min-h-full grow-0 w-2/6 bg-zinc-600">
                <ChatsTab chats={data.chats}/>
            </div> -->
            <div class="flex flex-col w-screen h-[92svh] md:h-[85svh] md:w-3/5 -mt-10 md:-mt-10 -mb-10 grow-1">
                <div class="w-full bg-white p-4 flex flex-row ">
                    <!-- go back button -->
                    <a href="/message" class="text-amber-500 hover:underline pt-1.5 pr-4">← Back</a>
                    <h1 class="text-2xl text-zinc-700">{data.props.user.displayName}</h1>
                </div>
                <div class="bg-zinc-600 h-full overflow-y-auto p-4">
                    {#if data.props}
                        {#each data.props.messages as message}
                            <Bubble ID={message.ID} content={message.Content} timestamp={message.CreatedAt} authorId={message.SenderID}/>
                        {/each}
                    {:else}
                        <h1 class="w-full text-center text-zinc-200 text-2xl mt-auto mb-20 bg-zinc-600 rounded-lg">No messages yet</h1>
                    {/if}
                </div>
                <!-- input section for new messages -->
                <div class="w-full bg-white p-4 flex flex-row gap-2">
                    <input type="text" class="w-full border border-zinc-600 rounded-sm p-2 text-zinc-800" placeholder="Type a message..."/>
                    <button class="bg-amber-500 text-white p-2 rounded-sm cursor-pointer">Send</button>
                </div>
            </div>
            
        {:else}
            <h1>Loading...</h1>
        {/if}
    </div>