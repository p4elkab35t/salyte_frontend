<script lang="ts">
    import ChatsTab from "$lib/components/chat/chatsTab.svelte";
    import type { PageProps } from "./$types";
    import { page } from "$app/state";
	import { onMount } from "svelte";
    import { MessageAPI } from "$lib/api/message";
	import { goto } from "$app/navigation";
    import ChatCard from "$lib/components/chat/chatCard.svelte";
	import { userProfileStore } from "$lib/stores/user";


    interface chatType {
        ID: string;
        Name: string;
        LastMessage?: string;
        LastMessageTime?: string;
        LastMessageAuthor?: string;
    }


    let isLoading = $state(true);
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
        if(!userProfileStore.getProfile().profileId){
            return;
        }
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
                            }).catch((error) => {
                                newChat['LastMessage'] = 'Currently no messages yet';
                                console.error(error);
                            }).finally(() => {
                                chats = [...chats, newChat];
                                console.log(chats);
                            });
                            
                            console.log(chats);
                        }
                    });
                }
            });
        } catch (error) {
            console.log(chats);
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
        userProfileStore.subscribe((user)=>{
            if(user.profileId){
                isLoading = false;
                fetchChats();
                console.log(chats);
            }
        });
        
    });
</script>

<style>

</style>

<div class="flex flex-row md:h-[95svh] h-[98svh]">
    <div class="w-full md:w-2/5 h-full bg-zinc-100">
        {#if userProfileStore.getProfile().profileId}
            {#if isLoading}
                loading...
            {:else}
                {#if chats.length === 0}
                    <p>No chats yet</p>
                {:else}
                    {#each chats as chat}
                        <ChatCard {...chat} />
                    {/each}
                {/if}
            {/if}
        {:else}
            <p>Not ready yet</p>
        {/if}
    </div>
    <div class="w-full md:w-3/5 h-full overflow-y-auto bg-zinc-600">
        {@render children()}
    </div>
</div>