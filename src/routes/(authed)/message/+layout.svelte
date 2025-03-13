<script lang="ts">
    import ChatsTab from "$lib/components/chat/chatsTab.svelte";
    import type { PageProps } from "./$types";
    import { page } from "$app/state";
	import { onMount } from "svelte";
    import { MessageAPI } from "$lib/api/message";
	import { goto } from "$app/navigation";
    import ChatCard from "$lib/components/chat/chatCard.svelte";


    interface chatType {
        ID: string;
        Name: string;
        LastMessage?: string;
        LastMessageTime?: string;
        LastMessageAuthor?: string;
    }

    
    let chats = $state<chatType[]>([]);
    let { children } = $props();

//     type Message struct {
// 	ID        uuid.UUID `db:"id"`
// 	ChatID    uuid.UUID `db:"chat_id"`
// 	SenderID  uuid.UUID `db:"sender_id"`
// 	Content   string    `db:"content"`
// 	CreatedAt time.Time `db:"created_at"`
// 	UpdatedAt time.Time `db:"updated_at"`
// 	IsDeleted bool      `db:"is_deleted"`
// }
// type Chat struct {
// 	ID        uuid.UUID `db:"id"`
// 	Name      string    `db:"name"`
// 	CreatedAt time.Time `db:"created_at"`
// 	UpdatedAt time.Time `db:"updated_at"`
// }

    const fetchChats = async () => {
        try {
            await MessageAPI.getAllChats().then((res) => {
                if(res.error) {
                    throw new Error(res.error);
                }
                if(Array.isArray(res) || res !== undefined || res !== null || res.length !== 0){
                    res.map(el => {
                        if(el && el.ID){
                            let newChat: { ID: any; Name: any; LastMessage?: string; LastMessageTime?: string; LastMessageAuthor?: string } = {
                                ID: el.ID,
                                Name: el.Name,
                            }
                            MessageAPI.getMessagesByChatID(el.ID, 1, 0).then((res) => {
                                if(res.error) {
                                    throw new Error(res.error);
                                }
                                if(res.length !== 0){
                                    newChat['LastMessage'] = res[0].Content;
                                    newChat['LastMessageTime'] = res[0].CreatedAt;
                                    newChat['LastMessageAuthor'] = res[0].SenderID;    
                                }
                                chats = [...chats, newChat];
                            }).catch((error) => {
                                console.error(error);
                            });
                        }
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    onMount(() => { 
        let params = page.url.searchParams;
        let profileID = params.get('profileID');
        if(profileID){
            MessageAPI.getChatByMembers(profileID).then((res)=>{
                if(res.error){
                    throw new Error(res.error);
                }
                if(res.ID){
                    goto(`/message/${res.ID}`);
                    return;
                }
            }).catch((error)=>{
                console.error(error);
            })
        }
        fetchChats();
        
    });
</script>

<style>

</style>

<div class="flex flex-row md:h-[95svh] h-[98svh]">
    <div class="w-full md:w-2/5 h-full bg-zinc-100">
        {#await fetchChats()}
            loading...
        {:then}
            {#each chats as chat}
                <ChatCard {...chat} />
            {/each}
        {:catch error}
            <p>{error.message}</p>
        {/await}
    </div>
    <div class="w-full md:w-3/5 h-full overflow-y-auto bg-zinc-600">
        {@render children()}
    </div>
</div>