<script lang="ts">
    import Bubble from "$lib/components/chat/message/bubble.svelte";
    import ChatsTab from "$lib/components/chat/chatsTab.svelte";
    import type { PageProps } from "./$types";
	import { onMount } from "svelte";
    import { MessageAPI } from "$lib/api/message";
    import { userProfileStore } from "$lib/stores/user";
	import { page } from "$app/state";
    let { data }: PageProps = $props();
    let currentPage = $state(0);
    let needLoad = $state(false)
    let messages: {ID: string; Content: string; SenderID: string; CreatedAt: string;}[] = $state([]); 
    // let chats = data.chats || [];
    const chatId = page.params.chatID;
    let newMessage = $state('')
   
    let messageSentinel: HTMLElement | null = $state(null);
    const sendMessage = async()=>{
        
    }

    const fetchMessages = async(page:number=0, chatID:string=chatId)=>{
        MessageAPI.getMessagesByChatID(chatID, 20, page).then((res)=>{
            if(Array.isArray(res)){
                messages = [...messages, ...res]
            }
        })
    }

    let observer: IntersectionObserver;

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                console.log('entries', entries);
                entries.forEach((entry) => {
                    console.log('entry', entry);
                    needLoad = entry.isIntersecting;
                    if (entry.isIntersecting) {
                        console.log('reached the end');
                        needLoad = true;
                        currentPage++;
                        fetchMessages(currentPage);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );
        console.log('sentinel', messageSentinel);

        if (messageSentinel) {
            console.log('observing');
            observer.observe(messageSentinel);
        }

        return () => {
            if (messageSentinel) {
                console.log('unobserving');
                observer.unobserve(messageSentinel);
            }
        };
    });

    onMount(() => {
        if(messageSentinel && observer){
            observer.observe(messageSentinel)
        }
        userProfileStore.subscribe(user=>{
            if(user.profileId){
                MessageAPI.getMessagesByChatID(chatId, 20, 0).then((res)=>{
                    if(Array.isArray(res)){
                        messages=[...res]
                    }
                })
            }
        })


    });


</script>

<style>

</style>


    <div class="flex flex-row h-full">
        {#if data}
            <!-- <div class="md:flex flex-col hidden min-h-full grow-0 w-2/6 bg-zinc-600">
                <ChatsTab chats={data.chats}/>
            </div> -->
            <div class="flex flex-col w-screen md:w-3/5 -mt-10 md:-mt-10 -mb-10 grow-1">
                <div class="w-full bg-white p-4 flex flex-row ">
                    <!-- go back button -->
                    <a href="/message" class="text-amber-500 hover:underline pt-1.5 pr-4">← Back</a>
                    <h1 class="text-2xl text-zinc-700">{data.props.user.displayName}</h1>
                </div>
                <div class="bg-zinc-600 h-full overflow-y-auto p-4">
                    <div class="h-2 w-full" bind:this={messageSentinel}> </div>
                    {#if messages.length>0}
                        {#each messages as message}
                            <Bubble ID={message.ID} content={message.Content} timestamp={message.CreatedAt} authorId={message.SenderID}/>
                        {/each}
                    {:else}
                        <h1 class="w-full text-center text-zinc-200 text-2xl mt-auto mb-20 bg-zinc-600 rounded-lg">No messages yet</h1>
                    {/if}
                </div>
                <!-- input section for new messages -->
                <div class="w-full bg-white p-4 flex flex-row gap-2">
                    <input type="text" class="w-full border border-zinc-600 rounded-sm p-2 text-zinc-800" placeholder="Type a message..." bind:value={newMessage}/>
                    <button class="bg-amber-500 text-white p-2 rounded-sm cursor-pointer" onclick={sendMessage}>Send</button>
                </div>
            </div>
            
        {:else}
            <h1>Loading...</h1>
        {/if}
    </div>